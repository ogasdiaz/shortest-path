import React, { useState, useEffect, useRef, Fragment } from "react";
import ForceGraph2D from "react-force-graph-2d";

import GraphActions from "./GraphActions";
import { AllPathsModal } from "./AllPaths";

const NODE_R = 7;
const ForceGraph = ({ graph }) => {
    const [paths, setPaths] = useState(null);
    const [graphData, SetGraphData] = useState(null);
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");

    const [highlightNodes, setHighlightNodes] = useState(new Set());
    const [highlightLinks, setHighlightLinks] = useState(new Set());

    const fgRef = useRef();

    const updateHighlight = () => {
      setHighlightNodes(highlightNodes);
      setHighlightLinks(highlightLinks);
    };

    useEffect(() => {
        const data = [
            ["A", "C", 5.5],
            ["A", "B", 5.4],
            ["A", "O", 4.3],
            ["A", "M", 5.4],
            ["A", "N", 3.7],
            ["B", "C", 3.5],
            ["B", "D", 4.5],
            ["B", "O", 3.3],
            ["C", "D", 2.9],
            ["E", "F", 3.5],
            ["E", "H", 4.3],
            ["E", "G", 3.0],
            ["F", "G", 4.4],
            ["F", "H", 3.5],
            ["G", "H", 4.3],
            ["G", "I", 3.5],
            ["I", "J", 4.2],
            ["I", "K", 4.7],
            ["J", "K", 3.0],
            ["J", "L", 3.2],
            ["J", "A", 3.7],
            ["B", "J", 3.2],
            ["K", "L", 4.8],
            ["K", "M", 4.2],
            ["M", "N", 5.3],
            ["M", "O", 3.5],
            ["M", "G", 2.8],
            ["E", "N", 3.1],
        ];

        let nodes = [];
        const links = [];

        const nodeDict = {};
        data.forEach(row => {
            if (typeof nodeDict[row[0]] === "undefined") {
                nodes.push({ id: row[0] });
                nodeDict[row[0]] = true;
            }

            if (typeof nodeDict[row[1]] === "undefined") {
                nodes.push({ id: row[1] });
                nodeDict[row[1]] = true;
            }

            links.push({
                source: row[0],
                target: row[1],
                label: row[2].toFixed(2),
            });

            links.push({
                source: row[1],
                target: row[0],
                label: row[2].toFixed(2),
            });

            graph.current.AddEdge(row[0], row[1], row[2]);
        });

        SetGraphData({ nodes, links });
    }, []);

    const getShortestPath = () => {
        let nodes = graph.current.GetShortestPath(source, target);
        nodes = nodes.split(",").filter(node => node);

        highlightNodes.clear();
        highlightLinks.clear();
        for (let i=0; i<nodes.length; ++i) {
            highlightNodes.add(nodes[i]);

            if (i) {
                highlightLinks.add(`${nodes[i-1]}-${nodes[i]}`);
            }
        }

        updateHighlight();
    };

    useEffect(() => {
        if (source && target) {
            getShortestPath();
        }
    }, [graphData, source, target])

    // Graph actions
    const calcShortestPath = (sourceID, targetID) => {
        setSource(sourceID);
        setTarget(targetID);
    }

    const calcAllPaths = () => {
        const response = graph.current.GetAllShortestPaths();
        const data = response.split("\n").map(row => row.split(","));
        setPaths(data);
    }

    const generateRandomGraph = (node_count, edge_count) => {
        const nodeIds = graphData.nodes.map(node => node.id);

        for (let i=0; i<nodeIds.length; i++) {
            graph.current.RemoveVertex(nodeIds[i]);
        }

        const stringID = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789";

        const nodes = []; 
        const links = [];
        for (let i=0; i<node_count; i++) {
            nodes.push({ id: stringID.charAt(i), __edges: 0 });
            graph.current.AddVertex(stringID.charAt(i));
        }

        for (let i=0; i<edge_count; i++) {
            const weight = +(4 + Math.random() * 3).toFixed(1);

            let source = 0;
            let target = 1;

            for (let j=0; j<5; j++) {
                const tmp = Math.floor(Math.random() * node_count);
                if (nodes[tmp].__edges < nodes[source].__edges) {
                    source = tmp;
                }
            }

            for (let j=0; j<5; j++) {
                const tmp = Math.floor(Math.random() * node_count);

                if (tmp === source) {
                    continue;
                }

                if (nodes[tmp].__edges < nodes[target].__edges) {
                    target = tmp;
                }
            }

            links.push({
                source: nodes[source].id,
                target: nodes[target].id,
                label: weight.toFixed(2),
            });

            links.push({
                source: nodes[target].id,
                target: nodes[source].id,
                label: weight.toFixed(2),
            });

            graph.current.AddEdge(
                nodes[source].id,
                nodes[target].id,
                weight
            );

            nodes[source].__edges += 1;
            nodes[target].__edges += 1;
        }

        SetGraphData({ nodes, links });
    }

    const onAddLink = (sourceID, targetID, latency) => {
        const duplicate = graphData.links.filter(link => (
            ((link.source.id == sourceID) && (link.target.id == targetID)) ||
            ((link.target.id == sourceID) && (link.source.id == targetID))
        )).length;
        if (duplicate) {
            return alert("Esta arista ya existe");
        }

        // Update C++
        graph.current.AddEdge(sourceID, targetID, latency);

        // Update visuals
        graphData.links.push({
            source: sourceID,
            target: targetID,
            label: latency.toFixed(2),
        });
        graphData.links.push({
            source: targetID,
            target: sourceID,
            label: latency.toFixed(2),
        });
        SetGraphData({ nodes: graphData.nodes, links: graphData.links });
    }

    const onAddNode = (nodeID) => {
        const duplicate = graphData.nodes.filter(node => node.id === nodeID).length;
        if (duplicate) {
            return alert("Este vértice ya existe");
        }

        // Update C++
        graph.current.AddVertex(nodeID);

        // Update visuals
        const node = { id: nodeID };
        graphData.nodes.push(node);
        SetGraphData({ nodes: graphData.nodes, links: graphData.links });
    }

    const onRemoveLink = (sourceID, targetID) => {
        // Update C++
        graph.current.RemoveEdge(sourceID, targetID);

        // Update visuals
        graphData.links = graphData.links.filter(link => (
            !(link.source.id === sourceID && link.target.id === targetID) &&
            !(link.target.id === sourceID && link.source.id === targetID)
        ));
        SetGraphData({ nodes: graphData.nodes, links: graphData.links });
    }

    const onRemoveNode = (nodeID) => {
        // Update C++
        graph.current.RemoveVertex(nodeID);

        // Update visuals
        graphData.links = graphData.links.filter(link => (
            link.source.id !== nodeID && link.target.id !== nodeID
        ));
        graphData.nodes = graphData.nodes.filter(node => node.id !== nodeID);
        SetGraphData({ nodes: graphData.nodes, links: graphData.links });
    }

    if (!graphData) {
        return null;
    }

    return (
        <Fragment>
            <GraphActions
                links={graphData.links}
                nodes={graphData.nodes}
                calcShortestPath={calcShortestPath}
                calcAllPaths={calcAllPaths}
                onAddLink={onAddLink}
                onAddNode={onAddNode}
                onRemoveLink={onRemoveLink}
                onRemoveNode={onRemoveNode}
                onRandomGraph={generateRandomGraph}
            />
            <AllPathsModal paths={paths} setPaths={setPaths} />
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeRelSize={NODE_R}
                autoPauseRedraw={false}
                linkWidth={link => highlightLinks.has(`${link.source.id}-${link.target.id}`) ? 5 : 1}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={link => highlightLinks.has(`${link.source.id}-${link.target.id}`) ? 4 : 0}
                nodeCanvasObject={(node, ctx) => {
                    // add ring just for highlighted nodes
                    if (highlightNodes.has(node.id)) {
                        ctx.beginPath();
                        ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
                        ctx.fillStyle = "orange";
                        ctx.fill();
                    }

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, NODE_R, 0, 2 * Math.PI, false);
                    ctx.fillStyle = "steelblue";
                    ctx.fill();

                    const label = node.id;
                    const fontSize = 6;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "white";
                    ctx.fillText(label, node.x, node.y);
        
                    node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                }}
                linkCanvasObjectMode={() => "after"}
                linkCanvasObject={(link, ctx) => {
                    const MAX_FONT_SIZE = 4;
                    const LABEL_NODE_MARGIN = 11;

                    const start = link.source;
                    const end = link.target;

                    if (start.id > end.id) {
                        return;
                    }

                    // ignore unbound links
                    if (typeof start !== "object" || typeof end !== "object") return;

                    // calculate label positioning
                    const textPos = Object.assign(...["x", "y"].map(c => ({
                      [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
                    })));

                    const relLink = { x: end.x - start.x, y: end.y - start.y };

                    const maxTextLength = Math.sqrt(Math.pow(relLink.x, 2) + Math.pow(relLink.y, 2)) - LABEL_NODE_MARGIN * 2;

                    let textAngle = Math.atan2(relLink.y, relLink.x);
                    // maintain label vertical orientation for legibility
                    if (textAngle > Math.PI / 2) textAngle = -(Math.PI - textAngle);
                    if (textAngle < -Math.PI / 2) textAngle = -(-Math.PI - textAngle);

                    const label = link.label;

                    // estimate fontSize to fit in link length
                    ctx.font = "1px Sans-Serif";
                    const fontSize = Math.min(MAX_FONT_SIZE, maxTextLength / ctx.measureText(label).width);
                    ctx.font = `${fontSize*1.5}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                    // draw text label (with background rect)
                    ctx.save();
                    ctx.translate(textPos.x, textPos.y);
                    ctx.rotate(textAngle);

                    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
                    ctx.fillRect(- bckgDimensions[0] / 2, - bckgDimensions[1] / 2, ...bckgDimensions);

                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "darkgrey";
                    ctx.fillText(label, 0, 0);
                    ctx.restore();
                }}
                cooldownTicks={100}
            />
        </Fragment>
    )
}

export default ForceGraph;
