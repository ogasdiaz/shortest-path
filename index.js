import React from 'react';
import ReactDOM from 'react-dom';

import Dijkstra from './wasm/Dijkstra.js';
import DijkstraWASM from './wasm/Dijkstra.wasm';

const dijkstra = Dijkstra({
    locateFile: () => {
        return DijkstraWASM;
    },
});

dijkstra.then((module) => {
    const d = new module.Dijkstra();
    d.AddEdge("A", "B", 100);
    d.GetShortestPath("A", "B");
});

ReactDOM.render(
    <div>
        <h1>Using WebAssembly with React From Scratch!</h1>
    </div>,
    document.getElementById('root')
);
