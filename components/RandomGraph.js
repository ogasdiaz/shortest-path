import React, { useState } from "react";

const RandomGraph = ({ onRandomGraph }) => {
    const [nodes, setNodes] = useState("1");
    const [edges, setEdges] = useState("0");

    return (
        <div>
            <div className="field">
                <label className="label">Nodos</label>
                <div className="control">
                    <input
                        type="number"
                        className="input"
                        value={nodes}
                        onChange={(e) => setNodes(e.target.value)}
                    />
                </div>
                {((+nodes) > 37) ? (
                    <span className="help has-text-danger">Máximo 37 nodos</span>
                ) : null}
            </div>

            <div className="field">
                <label className="label">Vértices</label>
                <div className="control">
                    <input
                        type="number"
                        className="input"
                        value={edges}
                        onChange={(e) => setEdges(e.target.value)}
                    />
                </div>
                {((+edges) > (+nodes)*(+nodes-1)/2) ? (
                    <span className="help has-text-danger">Máximo {(+nodes)*(+nodes - 1)/2} vértices</span>
                ) : null}
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className="button is-info is-fullwidth"
                        onClick={() => {
                            onRandomGraph(+nodes, +edges);
                            setNodes("");
                            setEdges("");
                        }}
                        disabled={!(0 < (+nodes) && (+nodes) < 38 && (+edges) <= ((+nodes)*(+nodes-1)/2))}
                    >
                        Generar grafo
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RandomGraph;
