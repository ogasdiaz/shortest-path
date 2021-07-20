#include <iostream>
#include <emscripten.h>
#include <emscripten/bind.h>

#include "Dijkstra.h"

using namespace emscripten;

class DijkstraBindings {
public:
    DijkstraBindings() {
        _dijkstra = new Dijkstra();
    }
    ~DijkstraBindings() = default;

    // Edge methods
    void AddEdgeBinding(std::string head, std::string tail, double weight) {
        _dijkstra->AddEdge(_dijkstra->AddVertex(head), _dijkstra->AddVertex(tail), weight);
    }
    void RemoveEdgeBinding(std::string head, std::string tail) {
        _dijkstra->RemoveEdge(_dijkstra->AddVertex(head), _dijkstra->AddVertex(tail));
    }

    // Vertex methods
    void AddVertexBinding(std::string name) {
        _dijkstra->AddVertex(name);
    }
    void RemoveVertexBinding(std::string vertex) {
        Vertex* v = _dijkstra->AddVertex(vertex);
        _dijkstra->RemoveVertex(&v);
    }

    // Shortest path methods
    std::string GetShortestPathBinding(std::string head, std::string tail) {
        std::vector<Vertex*> path = _dijkstra->GetShortestPath(_dijkstra->AddVertex(head), _dijkstra->AddVertex(tail));

        std::string path_string;
        for (auto v : path) {
            path_string = path_string + v->GetName() + ",";
        }
        
        return path_string;
    }
private:
    Dijkstra* _dijkstra;
};

EMSCRIPTEN_BINDINGS(Dijkstra) {
    class_<DijkstraBindings>("Dijkstra")
        .constructor<>()
        .function("AddVertex", &DijkstraBindings::AddVertexBinding)
        .function("RemoveVertex", &DijkstraBindings::RemoveVertexBinding)
        .function("AddEdge", &DijkstraBindings::AddEdgeBinding)
        .function("RemoveEdge", &DijkstraBindings::RemoveEdgeBinding)
        .function("GetShortestPath", &DijkstraBindings::GetShortestPathBinding);
}


