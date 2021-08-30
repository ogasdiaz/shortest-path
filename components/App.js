import React, { useState, useEffect, useRef } from "react";

import Graph from "../wasm/Graph.js";
import GraphWASM from "../wasm/Graph.wasm";
import ForceGraph from "./ForceGraph";
import Login from "./Login";

const App = () => {
    const [auth, setAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const GraphInstance = useRef(null);

    useEffect(() => {
        Graph({
            locateFile: () => GraphWASM
        }).then((module) => {
            GraphInstance.current = new module.Graph();
            setLoading(false);
        });
    }, []);

    if (!auth) {
        return <Login setAuth={setAuth} />
    }

    return (
        <div>
            {isLoading ? (
                <span>Cargando</span>
            ) : (
                <ForceGraph graph={GraphInstance} />
            )}
        </div>
    )
};

export default App;