// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include <iostream>
#include <string>
#include <tuple>
#include <vector>

#include "Dijkstra.h"
#include "Vertex.h"

int main() {
    std::vector<std::tuple<std::string, std::string, double>> edges;

    // Test data
    edges.push_back({"A", "B", 5.4});
    edges.push_back({"A", "C", 5.5});
    edges.push_back({"A", "M", 5.4});
    edges.push_back({"A", "N", 3.7});
    edges.push_back({"A", "O", 4.3});
    edges.push_back({"B", "C", 3.5});
    edges.push_back({"B", "D", 4.5});
    edges.push_back({"B", "J", 3.2});
    edges.push_back({"B", "O", 3.3});
    edges.push_back({"C", "D", 2.9});
    edges.push_back({"E", "F", 3.5});
    edges.push_back({"E", "G", 3.0});
    edges.push_back({"E", "H", 4.3});
    edges.push_back({"E", "N", 3.1});
    edges.push_back({"F", "G", 4.4});
    edges.push_back({"F", "H", 3.5});
    edges.push_back({"G", "H", 4.3});
    edges.push_back({"G", "I", 3.5});
    edges.push_back({"I", "J", 4.2});
    edges.push_back({"I", "K", 4.7});
    edges.push_back({"J", "A", 3.7});
    edges.push_back({"J", "K", 3.0});
    edges.push_back({"J", "L", 3.2});
    edges.push_back({"K", "L", 4.8});
    edges.push_back({"K", "M", 4.2});
    edges.push_back({"M", "G", 2.8});
    edges.push_back({"M", "N", 5.3});
    edges.push_back({"M", "O", 3.5});

    Dijkstra* _graph = new Dijkstra();

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
