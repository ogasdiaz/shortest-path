#include <iostream>
#include <emscripten.h>
#include <emscripten/bind.h>

#include "Dijkstra.h"

using namespace emscripten;

class DijkstraBindings {
public:
    DijkstraBindings() {
        std::cout << "HERE" << std::endl;
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
    void GetShortestPathBinding(std::string head, std::string tail) {
        std::vector<Vertex*> path = _dijkstra->GetShortestPath(_dijkstra->AddVertex(head), _dijkstra->AddVertex(tail));
        std::vector<std::string> r;

        for (auto v : path) {
            std::cout << v->GetName() << " ";
        }
        std::cout << std::endl;
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


