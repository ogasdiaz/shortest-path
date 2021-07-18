// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_EDGE_H_
#define CPP_EDGE_H_

class Edge {
public:
    Edge(double latency);
    ~Edge();

    double GetLatency();
private:
    double _latency;
};

#endif  // CPP_EDGE_H_
