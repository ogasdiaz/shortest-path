import React, { useState } from "react";

import AddLink from "./AddLink";
import AddNode from "./AddNode";
import AllPaths from "./AllPaths";
import RandomGraph from "./RandomGraph";
import RemoveLink from "./RemoveLink";
import RemoveNode from "./RemoveNode";
import ShortestPath from "./ShortestPath";

const GraphActions = (props) => {
    const [action, setAction] = useState("shortest_path");

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
                        <option value="all_paths">Mostrar los caminos más cortos</option>
                        <option value="add_link">Agregar arísta</option>
                        <option value="add_node">Agregar vértice</option>
                        <option value="remove_link">Eliminar arísta</option>
                        <option value="remove_node">Eliminar vértice</option>
                        <option value="random_graph">Nuevo grafo</option>
                    </select>
                </div>
            </div>
            {action === "shortest_path" ? <ShortestPath {...props} />: null}
            {action === "all_paths" ? <AllPaths {...props} />: null}
            {action === "add_link" ? <AddLink {...props} />: null}
            {action === "add_node" ? <AddNode {...props} />: null}
            {action === "remove_link" ? <RemoveLink {...props} />: null}
            {action === "remove_node" ? <RemoveNode {...props} />: null}
            {action === "random_graph" ? <RandomGraph {...props} />: null}
        </div>
    );
};

export default GraphActions;