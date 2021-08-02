// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_SHORTESTPATH_H_
#define CPP_SHORTESTPATH_H_

#include <vector>

#include "Edge.h"
#include "Graph.h"
#include "Vertex.h"

class ShortestPath : public Graph::Observer {
public:
    explicit ShortestPath(Graph* graph);
    ~ShortestPath() override;

    void CalcAllShortestPaths();
    std::vector<Vertex*> GetShortestPath(Vertex* head, Vertex* tail);
    std::vector<std::pair<Vertex*, Vertex*>> GetRedundantEdges();

private:
    void OnUpdate() override;

    Graph* _graph;

    // Store pre-computed all-pair shortest path
    bool _floyd_sync;
    std::unordered_map<Vertex*, int>* _vertex_id;
    std::unordered_map<int, Vertex*>* _id_vertex;
    std::vector<double>* _distances;
    std::vector<int>*  _paths;
};

#endif  // CPP_SHORTESTPATH_H_
