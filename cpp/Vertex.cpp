// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Vertex.h"

Vertex::Vertex(int id, std::string name) : _id(id), _name(name) {}

Vertex::~Vertex() = default;

int Vertex::GetID() {
    return _id;
}

std::string Vertex::GetName() {
    return _name;
}

void Vertex::AddEdge(Vertex* vertex, Edge* edge) {
    auto search = _edges.find(vertex);
    if (search != _edges.end())
        return;

    _edges[vertex] = edge;
}

void Vertex::RemoveEdge(Vertex* vertex) {
    auto search = _edges.find(vertex);
    if (search != _edges.end())
        _edges.erase(search);
}

std::unordered_map<Vertex*, Edge*>& Vertex::GetEdges() {
    return _edges;
}
