import React, { useState } from "react";

import AddNode from './AddNode';

const GraphActions = (props) => {
    const [action, setAction] = useState("add_node");

    return (
        <div className="box" style={{
                position: "absolute",
                zIndex: 10,
                top: "1rem",
                left: "1rem"
        }}>
            <div className="field">
                <label className="label">Aciones</label>
                <div className="select is-fullwidth">
                    <select value={action} onChange={(e) => setAction(e.target.value)}>
                        <option value="shortest_path">Encontrar camino más corto</option>
                        <option value="add_link">Agregar arísta</option>
                        <option value="add_node">Agregar vértice</option>
                        <option value="remove_link">Eliminar arísta</option>
                        <option value="remove_node">Eliminar vértice</option>
                    </select>
                </div>
            </div>
            {action === "add_node" ? (
                <AddNode onAddNode={props.onAddNode} />
            ) : null}
        </div>
    );
};

export default GraphActions;