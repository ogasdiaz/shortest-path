// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_DIJKSTRA_H_
#define CPP_DIJKSTRA_H_

#include "ShortestPathGraph.h"

class Dijkstra : public ShortestPathGraph {
public:
    Dijkstra();
    ~Dijkstra() override;
    void GetShortestPath(Vertex* head, Vertex* tail) override;
};

#endif  // CPP_DIJKSTRA_H_

