// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Simulator.h"

#include <iostream>
#include "Vertex.h"

Simulator::Simulator(std::vector<std::tuple<std::string, std::string, double>>& edges) {
    _graph = new Dijkstra();

    for (auto edge : edges) {
        Vertex* head = _graph->AddVertex(std::get<0>(edge));
        Vertex* tail = _graph->AddVertex(std::get<1>(edge));
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

    Vertex* A = _graph->AddVertex("A");
    Vertex* L = _graph->AddVertex("L");
    _graph->GetShortestPath(A, L);
}

Simulator::~Simulator() = default;
