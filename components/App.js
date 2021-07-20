import React, { useState, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

import Dijkstra from '../wasm/Dijkstra.js';
import DijkstraWASM from '../wasm/Dijkstra.wasm';
import ForceGraph from './ForceGraph';

const App = () => {
    const [isLoading, setLoading] = useState(true);
    const DijkstraInstance = useRef(null);

    useEffect(() => {
        const dijkstra = Dijkstra({
            locateFile: () => DijkstraWASM
        });

        dijkstra.then((module) => {
            DijkstraInstance.current = new module.Dijkstra();
            setLoading(false);
        });
    }, []);

    return (
        <div>
            {isLoading ? (
                <span>Cargando</span>
            ) : (
                <ForceGraph dijkstra={DijkstraInstance} />
            )}
        </div>
    )
};

export default App;