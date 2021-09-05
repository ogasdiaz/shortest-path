// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "ShortestPath.h"

#include <algorithm>
#include <cfloat>
#include <queue>
#include <unordered_map>
#include <vector>

#include "Vertex.h"

ShortestPath::ShortestPath(Graph* graph) : _graph(graph) {
    _graph->AddObserver(this);
    _floyd_sync = false;
    _prev_alloc = false;
}

ShortestPath::~ShortestPath() {
    _graph->RemoveObserver(this);
}

void ShortestPath::OnUpdate() {
    _floyd_sync = false;
}

void ShortestPath::CalcAllShortestPaths() {
    std::vector<Vertex*> vertices = _graph->GetVertices();

    // Free previous computation
    if (_prev_alloc) {
        delete _vertex_id;
        delete _id_vertex;
        delete _distances;
        delete _variances;
        delete _paths;
    }

    _prev_alloc = true;
    _vertex_id = new std::unordered_map<Vertex*, int>;
    _id_vertex = new std::unordered_map<int, Vertex*>;
    _distances = new std::vector<double>(vertices.size() * vertices.size(), 1e10);
    _variances = new std::vector<double>(vertices.size() * vertices.size(), 0);
    _paths = new std::vector<int>(vertices.size() * vertices.size(), -1);

    for (auto* vertex: vertices) {
        int id = _vertex_id->size();
        _vertex_id->insert(std::make_pair(vertex, id));
        _id_vertex->insert(std::make_pair(id, vertex));
    }

    for (auto head : vertices) {
        int headIX = _vertex_id->at(head);
        _distances->at(headIX * vertices.size() + headIX) = 0;
        _paths->at(headIX * vertices.size() + headIX) = 0;

        for (auto& [tail, edge] : head->GetEdges()) {
            int tailIX = _vertex_id->at(tail);
            _distances->at(headIX * vertices.size() + tailIX) = edge->GetMean();
            _variances->at(headIX * vertices.size() + tailIX) = edge->GetStddev();
            _paths->at(headIX * vertices.size() + tailIX) = headIX;
        }
    }

    // O(V^3)
    for (int k = 0; k < vertices.size(); k += 1) {
        for (int i = 0; i < vertices.size(); i += 1) {
            for (int j = 0; j < vertices.size(); j += 1) {
                double tmp_distance = _distances->at(i * vertices.size() + k) + _distances->at(k * vertices.size() + j);
                double tmp_variance = _variances->at(i * vertices.size() + k) + _variances->at(k * vertices.size() + j);

                double current_distance = _distances->at(i * vertices.size() + j);
                double current_variance = _variances->at(i * vertices.size() + j);

                bool update = false;
                if (abs(current_distance - tmp_distance) < 1e-3) {
                    if (abs(current_variance - tmp_variance) < 1e-3) {
                        // Ignore equal variance
                    } else if (current_variance > tmp_variance) {
                        update = true;
                    }
                } else if (current_distance > tmp_distance) {
                    update = true;
                }

                if (update) {
                    _distances->at(i * vertices.size() + j) = tmp_distance;
                    _variances->at(i * vertices.size() + j) = tmp_variance;
                    _paths->at(i * vertices.size() + j) = _paths->at(k * vertices.size() + j);
                }
            }
        }
    }

    _floyd_sync = true;
}

std::vector<Vertex*> ShortestPath::GetShortestPath(Vertex* head, Vertex* tail) {
    if (!_floyd_sync) {
        CalcAllShortestPaths();
    }

    std::vector<Vertex*> path;
    int head_id = _vertex_id->at(head);
    int tail_id = _vertex_id->at(tail);

    if (_paths->at(head_id * _vertex_id->size() + tail_id) == -1) {
        return path;
    }

    // O(V)
    path.push_back(_id_vertex->at(tail_id));
    while (_paths->at(head_id * _vertex_id->size() + tail_id) != head_id) {
        tail_id = _paths->at(head_id * _vertex_id->size() + tail_id);
        path.push_back(_id_vertex->at(tail_id));
    }
    path.push_back(_id_vertex->at(head_id));

    std::reverse(path.begin(), path.end());

    return path;
}

std::vector<std::pair<Vertex*, Vertex*>> ShortestPath::GetRedundantEdges() {
    if (!_floyd_sync) {
        CalcAllShortestPaths();
    }

    std::vector<std::pair<Vertex*, Vertex*>> redundant_edges;
    std::vector<Vertex*> vertices = _graph->GetVertices();

    // O(V + E)
    for (auto head : vertices) {
        int head_id = _vertex_id->at(head);

        for (auto& [tail, edge] : head->GetEdges()) {
            int tail_id = _vertex_id->at(tail);

            if (head_id != _paths->at(head_id * vertices.size() + tail_id)) {
                redundant_edges.push_back({head, tail});
            }
        }
    }

    return redundant_edges;
}
