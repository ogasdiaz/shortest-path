// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_GRAPH_H_
#define CPP_GRAPH_H_

#include <string>
#include <vector>

#include "Edge.h"
#include "Vertex.h"

class Graph {
public:
    int GetVertexID(std::string name, bool register_new);

    // Edge methods
    Edge* AddEdge(Vertex* head, Vertex* tail, double weight);
    bool RemoveEdge(Vertex* head, Vertex* tail);

    // Vertex methods
    Vertex* AddVertex(std::string name);
    bool RemoveVertex(Vertex** vertex);
    std::vector<Vertex*> GetVertices();

protected:
    // std::vector<Vertex*> _vertices;
    std::unordered_map<int, Vertex*> _vertices;
};

#endif  // CPP_GRAPH_H_
