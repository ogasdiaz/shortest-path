// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_SIMULATOR_H_
#define CPP_SIMULATOR_H_

#include <string>
#include <tuple>
#include <vector>

#include "Graph.h"
#include "Dijkstra.h"

class Simulator {
public:
    Simulator(std::vector<std::tuple<std::string, std::string, double>>& edges);
    ~Simulator();

private:
    Dijkstra* _graph;
};

#endif  // CPP_SIMULATOR_H_
