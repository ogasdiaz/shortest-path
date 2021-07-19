// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Dijkstra.h"

#include <iostream>
#include <queue>

Dijkstra::Dijkstra() = default;

Dijkstra::~Dijkstra() = default;

void Dijkstra::GetShortestPath(Vertex* head, Vertex* tail) {
    // Do nothing
    std::cout << "GetShortestPath: ";
    std::cout << head->GetName() << " - " << tail->GetName() << std::endl;

    std::vector<bool> vertex_seen(_vertices.size(), false);
    std::priority_queue<
        std::pair<double, Vertex*>,
        std::vector<std::pair<double, Vertex*>>,
        std::greater<std::pair<double, Vertex*>>
    > Q;

    // O(E + VlogV)
    Q.push({ 0., head });
    while (!Q.empty()) {
        std::pair<double, Vertex*> tmp = Q.top();
        if (!vertex_seen[tmp.second->GetID()]) {
            vertex_seen[tmp.second->GetID()] = true;

            if (tmp.second == tail) {
                std::cout << "HEREERERE " << tmp.first << std::endl;
                return;
            }

            for (auto& [tail, edge] : tmp.second->GetEdges())
                Q.push({ tmp.first + edge->GetLatency(), tail });

            std::cout << tmp.second->GetName() << " reached in " << tmp.first << std::endl;
        }
        Q.pop();
    }
}