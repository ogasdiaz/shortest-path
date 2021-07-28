import React, { useState } from 'react';

const AddLink = ({ nodes, onAddLink }) => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [latency, setLatency] = useState(0.0);

    return (
        <div>
            <div className="field">
                <label className="label">Origen</label>
                <div className="select is-fullwidth">
                    <select value={from} onChange={(e) => setFrom(e.target.value)}>
                        <option value="">Seleccionar vértice</option>
                        {nodes.map(node => (
                            <option key={node.id} value={node.id}>{node.id}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="field">
                <label className="label">Destino</label>
                <div className="select is-fullwidth">
                    <select value={to} onChange={(e) => setTo(e.target.value)}>
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
                        onChange={(e) => setLatency(e.target.value)}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-info is-fullwidth"
                        onClick={() => onAddLink(from, to, latency)}
                        disabled={!from || !to || latency < 0.1 || from == to}
                    >
                        Agregar vértice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddLink;
