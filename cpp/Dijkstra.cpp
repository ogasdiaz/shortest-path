// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Dijkstra.h"

#include <algorithm>
#include <iostream>
#include <queue>
#include <unordered_map>

Dijkstra::Dijkstra() = default;

Dijkstra::~Dijkstra() = default;

std::vector<Vertex*> Dijkstra::GetShortestPath(Vertex* head, Vertex* tail) {
    // Do nothing
    std::cout << "GetShortestPath: ";
    std::cout << head->GetName() << " - " << tail->GetName() << std::endl;

    std::vector<bool> vertex_seen(_vertices.size(), false);
    std::unordered_map<Vertex*, Vertex*> parent;
    std::priority_queue<
        std::tuple<double, Vertex*, Vertex*>,
        std::vector<std::tuple<double, Vertex*, Vertex*>>,
        std::greater<std::tuple<double, Vertex*, Vertex*>>
    > Q;

    // O(E + VlogV)
    Q.push({ 0., head, head });
    while (!Q.empty()) {
        std::tuple<double, Vertex*, Vertex*> tmp = Q.top();
        double weight = std::get<0>(tmp);
        Vertex* current = std::get<1>(tmp);
        Vertex* from = std::get<2>(tmp);

        if (parent.find(current) == parent.end()) {
            parent[current] = from;

            if (current == tail) {
                break;
            }

            for (auto& [tail, edge] : current->GetEdges()) {
                Q.push({ weight + edge->GetLatency(), tail, current });
            }
        }
        Q.pop();
    }

    std::vector<Vertex*> path;
    Vertex* tmp = tail;
    while (true) {
        path.push_back(tmp);

        if (tmp == parent[tmp]) {
            break;
        }

        tmp = parent[tmp];
    }

    std::reverse(path.begin(), path.end());

    return path;
}