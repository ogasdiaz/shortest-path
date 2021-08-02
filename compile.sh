#/bin/bash

emcc -std=c++17 --bind bindings/GraphBindings.cpp -Icpp/ cpp/*.cpp -s WASM=1 -s MODULARIZE=1 -s ALLOW_MEMORY_GROWTH=1 -o wasm/Graph.js

