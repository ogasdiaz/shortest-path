// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Simulator.h"

#include <iostream>

Simulator::Simulator(std::vector<std::tuple<std::string, std::string, double>>& edges) {
    _graph = new Dijkstra();

    for (auto edge : edges) {
        int head =  _graph->GetVertexID(std::get<0>(edge), true);
        int tail =  _graph->GetVertexID(std::get<1>(edge), true);
        double latency = std::get<2>(edge);

        _graph->AddEdge(head, tail, latency);
    }

    for (auto head : _graph->GetVertices()) {
        std::cout << head->GetName() << ": ";
        for (auto& [tail, edge] : head->GetEdges()) {
            std::cout << "(" << tail->GetName() << ", " << edge->GetLatency() << ") ";
        }
        std::cout << std::endl;
    }

    Vertex* A = _graph->GetVertices()[0];
    Vertex* L = _graph->GetVertices()[14];

    _graph->GetShortestPath(A, L);
}

Simulator::~Simulator() = default;
