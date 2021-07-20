import React, { useState, useEffect, useRef, Fragment } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const NODE_R = 5;
const ForceGraph = ({ dijkstra }) => {
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

        const nodes = [];
        const links = [];

        const nodeDict = {};
        data.forEach(row => {
            if (typeof nodeDict[row[0]] === 'undefined') {
                nodes.push({ id: row[0] });
                nodeDict[row[0]] = true;
            }

            if (typeof nodeDict[row[1]] === 'undefined') {
                nodes.push({ id: row[1] });
                nodeDict[row[1]] = true;
            }

            links.push({
                source: row[0],
                target: row[1],
            });

            links.push({
                source: row[1],
                target: row[0],
            });

            dijkstra.current.AddEdge(row[0], row[1], row[2]);
        });

        SetGraphData({ nodes, links });
    }, []);

    const getShortestPath = () => {
        let nodes = dijkstra.current.GetShortestPath(source, target);
        nodes = nodes.split(',').filter(node => node);

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
    }, [source, target])

    if (!graphData) {
        return null;
    }

    return (
        <Fragment>
            <div style={{ position: 'absolute', zIndex: 10 }}>
                <div>
                    <select value={source} onChange={e => setSource(e.target.value)}>
                        <option>-- Origen --</option>
                        {graphData.nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <select value={target} onChange={e => setTarget(e.target.value)}>
                        <option>-- Destino --</option>
                        {graphData.nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ForceGraph2D
                ref={fgRef}
                graphData={graphData}
                nodeRelSize={NODE_R}
                autoPauseRedraw={false}
                linkWidth={link => highlightLinks.has(`${link.source.id}-${link.target.id}`) ? 5 : 1}
                linkDirectionalParticles={4}
                linkDirectionalParticleWidth={link => highlightLinks.has(`${link.source.id}-${link.target.id}`) ? 4 : 0}
                nodeCanvasObjectMode={node => highlightNodes.has(node.id) ? 'before' : undefined}
                nodeCanvasObject={(node, ctx) => {
                    // add ring just for highlighted nodes
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, NODE_R * 1.4, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'orange';
                    ctx.fill();
                }}
            />
        </Fragment>
    )
}

export default ForceGraph;