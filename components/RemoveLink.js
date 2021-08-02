import React, { useState } from "react";

const RemoveLink = ({ nodes, links, onRemoveLink }) => {
    const [sourceID, setSourceID] = useState("");
    const [targetID, setTargetID] = useState("");

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
                        {links
                            .filter(link => link.source.id === sourceID)
                            .map(link => link.target)
                            .map(node => (
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
                            onRemoveLink(sourceID, targetID)
                            setSourceID("");
                            setTargetID("");
                        }}
                        disabled={!sourceID || !targetID}
                    >
                        Eliminar arista
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RemoveLink;
