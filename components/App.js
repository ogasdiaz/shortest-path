import React, { useState, useEffect, useRef } from 'react';

import Graph from '../wasm/Graph.js';
import GraphWASM from '../wasm/Graph.wasm';
import ForceGraph from './ForceGraph';

const App = () => {
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