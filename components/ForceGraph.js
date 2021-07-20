import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const ForceGraph = ({ dijkstra }) => {
    const [graphData, SetGraphData] = useState(null);
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");
    const fgRef = useRef();

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
                value: row[2],
            });

            links.push({
                source: row[1],
                target: row[0],
                value: row[2],
            });

            console.log(row[0], row[1], row[2]);
            dijkstra.current.AddEdge(row[0], row[1], row[2]);
        });

        SetGraphData({ nodes, links });
    }, []);

    const getShortestPath = () => {
        dijkstra.current.GetShortestPath(source, target);
    };

    return (
        <div>
            <div>
                <input type="text" value={source} onChange={e => setSource(e.target.value)} />
                <input type="text" value={target} onChange={e => setTarget(e.target.value)} />
                <button onClick={getShortestPath}>Calc min path</button>
            </div>
            {graphData ? (
                <ForceGraph2D
                    ref={fgRef}
                    graphData={graphData}
                    nodeCanvasObject={(node, ctx, globalScale) => {
                        const label = node.id;
                        const fontSize = 24/globalScale;
                        ctx.font = `${fontSize}px Sans-Serif`;
                        const textWidth = ctx.measureText(label).width;
                        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

                        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillStyle = 'steelblue';
                        ctx.fillText(label, node.x, node.y);

                        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
                    }}
                    onLinkClick={link => fgRef.current.emitParticle(link)}
                />
            ) : null}
        </div>
    )
}

export default ForceGraph;