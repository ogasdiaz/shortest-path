import React, { useState } from 'react';

const AddNode = ({ onAddNode }) => {
    const [nodeID, setNodeID] = useState("");

    return (
        <div>
            <div className="field">
                <label className="label">Nombre del vértice</label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        value={nodeID}
                        onChange={(e) => {
                            let nodeID = e.target.value;
                            nodeID = nodeID.toUpperCase();
                            nodeID = nodeID.substr(0, 1);

                            setNodeID(nodeID);
                        }}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <button
                        className="button is-info is-fullwidth"
                        onClick={() => onAddNode(nodeID)}
                    >
                        Agregar vértice
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddNode;
