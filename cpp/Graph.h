// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_GRAPH_H_
#define CPP_GRAPH_H_

#include <string>
#include <vector>

#include "Vertex.h"

class Graph {
public:
    int GetVertexID(std::string name, bool register_new);

    void AddEdge(int head, int tail, double weight);

    std::vector<Vertex*>& GetVertices();

protected:
    std::vector<Vertex*> _vertices;
};

#endif  // CPP_GRAPH_H_
