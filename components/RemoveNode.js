import React, { useState } from "react";

const RemoveNode = ({ nodes, onRemoveNode }) => {
    const [nodeID, setNodeID] = useState("");

    return (
        <div>
            <div className="field">
                <label className="label">Vértice por eliminar</label>
                <div className="select is-fullwidth">
                    <select value={nodeID} onChange={(e) => setNodeID(e.target.value)}>
                        <option value="">Seleccionar vértice</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="field">
                <div className="control">
                    <button
                        className="button is-info is-fullwidth"
                        onClick={() => {
                            onRemoveNode(nodeID);
                            setNodeID("");
                        }}
                        disabled={nodeID === ""}
                    >
                        Eliminar vértice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveNode;