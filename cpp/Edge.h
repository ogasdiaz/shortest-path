// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_EDGE_H_
#define CPP_EDGE_H_

#include <random>

class Edge {
public:
    Edge(double mean, double stddev);
    ~Edge();

    double GetLatency();
    double GetMean();
    double GetStddev();
private:
    double _mean, _stddev;
    std::mt19937* _generator;
    std::normal_distribution<double>* _distribution;
};

#endif  // CPP_EDGE_H_
