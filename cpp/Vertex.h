// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_VERTEX_H_
#define CPP_VERTEX_H_

#include <string>
#include <unordered_map>

#include "Edge.h"

class Vertex {
public:
    Vertex(int id, std::string name);
    ~Vertex();

    int GetID();
    std::string GetName();

    void AddEdge(Vertex* vertex, Edge* edge);
    bool RemoveEdge(Vertex* vertex);
    std::unordered_map<Vertex*, Edge*>& GetEdges();
private:
    int _id;
    std::string _name;
    std::unordered_map<Vertex*, Edge*> _edges;
};

#endif  // CPP_VERTEX_H_
