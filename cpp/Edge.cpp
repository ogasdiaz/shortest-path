// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Edge.h"

Edge::Edge(double mean, double stddev) : _mean(mean), _stddev(stddev) {
    _generator = new std::mt19937(time(NULL));
    _distribution = new std::normal_distribution<double>(mean, stddev);
}

Edge::~Edge() = default;

double Edge::GetLatency() {
    return (*_distribution)(*_generator);
}

double Edge::GetMean() {
    return _mean;
}

double Edge::GetStddev() {
    return _stddev;
}
