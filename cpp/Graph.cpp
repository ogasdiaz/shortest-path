// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#include "Graph.h"

#include "Edge.h"

Edge* Graph::AddEdge(Vertex* head, Vertex* tail, double weight) {
    Edge* edge = new Edge(weight);
    head->AddEdge(tail, edge);
    tail->AddEdge(head, edge);

    NotifyObservers();
    return edge;
}

bool Graph::RemoveEdge(Vertex* head, Vertex* tail) {
    bool response = true;

    response &= head->RemoveEdge(tail);
    response &= tail->RemoveEdge(head);

    NotifyObservers();
    return response;
}

Vertex* Graph::AddVertex(std::string name) {
    for (auto vertex : _vertices) {
        if (vertex.second->GetName() == name) {
            return vertex.second;
        }
    }

    int vertex_id = _vertices.size();
    Vertex* vertex = new Vertex(vertex_id, name);
    _vertices[vertex_id] = vertex;

    NotifyObservers();
    return vertex;
}

bool Graph::RemoveVertex(Vertex** vertex) {
    if (!(*vertex)) {
        return false;
    }

    for (auto& [tail, edge] : (*vertex)->GetEdges()) {
        tail->RemoveEdge(*vertex);
    }

    _vertices.erase(_vertices.find((*vertex)->GetID()));

    delete *vertex;
    *vertex = nullptr;

    NotifyObservers();
    return true;
}

std::vector<Vertex*> Graph::GetVertices() {
    std::vector<Vertex*> response;

    for (auto iv: _vertices) {
        response.push_back(iv.second);
    }

    return response;
}

void Graph::AddObserver(Observer* observer) {
    _observers.insert(observer);
}

void Graph::RemoveObserver(Observer* observer) {
    _observers.erase(_observers.find(observer));
}

void Graph::NotifyObservers() {
    for (auto& observer : _observers) {
        observer->OnUpdate();
    }
}
