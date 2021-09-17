// Copyright 2021 Og Astorga. All rights reserved.
// Use of this source code is governed by a CC-BY-NC-SA license that can be
// found in the LICENSE file.

#ifndef CPP_GRAPH_H_
#define CPP_GRAPH_H_

#include <string>
#include <unordered_set>
#include <vector>

#include "Edge.h"
#include "Vertex.h"

class Graph {
public:
    class Observer {
    public:
        virtual void OnUpdate() = 0;
    protected:
        virtual ~Observer() {};
    };

    // Edge methods
    Edge* AddEdge(Vertex* head, Vertex* tail, double weight);
    bool RemoveEdge(Vertex* head, Vertex* tail);

    // Vertex methods
    Vertex* AddVertex(std::string name);
    bool RemoveVertex(Vertex** vertex);
    std::vector<Vertex*> GetVertices();

    // Observer methods
    void AddObserver(Observer* observer);
    void RemoveObserver(Observer* observer);
    void NotifyObservers();

protected:
    int last_id = 0;
    std::unordered_map<int, Vertex*> _vertices;
    std::unordered_set<Observer*> _observers;
};

#endif  // CPP_GRAPH_H_
