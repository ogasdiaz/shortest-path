// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_SHORTESTPATHGRAPH_H_
#define CPP_SHORTESTPATHGRAPH_H_

#include "Graph.h"
#include "Vertex.h"

class ShortestPathGraph : public Graph {
public:
    ShortestPathGraph() = default;
    virtual ~ShortestPathGraph() = default;

    virtual std::vector<Vertex*> GetShortestPath(Vertex* heal, Vertex* tail) = 0;
};

#endif  // CPP_SHORTESTPATHGRAPH_H_
