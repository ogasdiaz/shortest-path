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

    Vertex* A = _graph->AddVertex("H");
    Vertex* L = _graph->AddVertex("D");
    std::vector<Vertex*> path = _graph->GetShortestPath(A, L);

    std::cout << A->GetName() << " - " << L->GetName() << std::endl;
    for (Vertex* vertex : path) {
        std::cout << vertex->GetName() << " ";
    }
    std::cout << std::endl;
}

Simulator::~Simulator() = default;
