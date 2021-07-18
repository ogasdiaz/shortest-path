// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Graph.h"

#include "Edge.h"

int Graph::GetVertexID(std::string name, bool register_new) {
    for (auto vertex : _vertices) {
        if (vertex->GetName() == name) {
            return vertex->GetID();
        }
    }

    if (register_new) {
        Vertex* vertex = new Vertex(_vertices.size(), name);
        _vertices.push_back(vertex);
        return vertex->GetID();
    }

    return -1; 
}

void Graph::AddEdge(int head, int tail, double weight) {
    Vertex* headVertex = _vertices[head];
    Vertex* tailVertex = _vertices[tail];

    Edge* edge = new Edge(weight);
    headVertex->AddEdge(tailVertex, edge);
    tailVertex->AddEdge(headVertex, edge);
}

std::vector<Vertex*>& Graph::GetVertices() {
    return _vertices;
}
