import React, { useState, useEffect } from "react";

const ShortestPath = ({ nodes, links, calcShortestPath }) => {
    const [sourceID, setSourceID] = useState("");
    const [targetID, setTargetID] = useState("");

    useEffect(() => {
        if (sourceID !== "" && targetID !== "" && sourceID !== targetID) {
            calcShortestPath(sourceID, targetID);
        }
    }, [sourceID, targetID]);

    return (
        <div>
            <div className="field">
                <label className="label">Vértice origen</label>
                <div className="select is-fullwidth">
                    <select value={sourceID} onChange={(e) => setSourceID(e.target.value)}>
                        <option value="">Seleccionar vértice</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Vértice destino</label>
                <div className="select is-fullwidth">
                    <select value={targetID} onChange={(e) => setTargetID(e.target.value)}>
                        <option value="">Seleccionar vértice</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
};

export default ShortestPath;
