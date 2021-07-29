#/bin/bash

emcc -std=c++17 --bind bindings/DijkstraBindings.cpp -Icpp/ cpp/*.cpp -s WASM=1 -s MODULARIZE=1 -o wasm/Dijkstra.js

