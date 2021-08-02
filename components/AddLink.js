import React, { useState } from "react";

const AddLink = ({ nodes, onAddLink }) => {
    const [sourceID, setSourceID] = useState("");
    const [targetID, setTargetID] = useState("");
    const [latency, setLatency] = useState(0.0);

    return (
        <div>
            <div className="field">
                <label className="label">Vértice de origen</label>
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
                <label className="label">Vértice de destino</label>
                <div className="select is-fullwidth">
                    <select value={targetID} onChange={(e) => setTargetID(e.target.value)}>
                        <option value="">Seleccionar vértice</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>
 
            <div className="field">
                <label className="label">Tiempo medio de envío (s)</label>
                <div className="control">
                    <input
                        type="number"
                        className="input"
                        value={latency}
                        onChange={(e) => setLatency(+e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-info is-fullwidth"
                        onClick={() => {
                            onAddLink(sourceID, targetID, latency);
                            setSourceID("");
                            setTargetID("");
                            setLatency(0.0);
                        }}
                        disabled={!sourceID || !targetID || latency < 0.1 || sourceID === targetID}
                    >
                        Agregar vértice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLink;
