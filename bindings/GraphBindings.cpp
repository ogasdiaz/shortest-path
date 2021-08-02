#include <emscripten.h>
#include <emscripten/bind.h>

#include "Graph.h"
#include "ShortestPath.h"

using namespace emscripten;

class WebBindings {
public:
    WebBindings() {
        _graph = new Graph();
        _shortest_path = new ShortestPath(_graph);
    }
    ~WebBindings() = default;

    // Edge methods
    void AddEdgeBinding(std::string head, std::string tail, double weight) {
        _graph->AddEdge(_graph->AddVertex(head), _graph->AddVertex(tail), weight);
    }
    void RemoveEdgeBinding(std::string head, std::string tail) {
        _graph->RemoveEdge(_graph->AddVertex(head), _graph->AddVertex(tail));
    }

    // Vertex methods
    void AddVertexBinding(std::string name) {
        _graph->AddVertex(name);
    }
    void RemoveVertexBinding(std::string vertex) {
        Vertex* v = _graph->AddVertex(vertex);
        _graph->RemoveVertex(&v);
    }

    // Shortest path methods
    std::string GetShortestPathBinding(std::string head, std::string tail) {
        std::vector<Vertex*> path = _shortest_path->GetShortestPath(_graph->AddVertex(head), _graph->AddVertex(tail));

        std::string path_string;
        for (auto v : path) {
            path_string = path_string + v->GetName() + ",";
        }

        return path_string;
    }
private:
    Graph* _graph;
    ShortestPath* _shortest_path;
};

EMSCRIPTEN_BINDINGS(Graph) {
    class_<WebBindings>("Graph")
        .constructor<>()
        .function("AddVertex", &WebBindings::AddVertexBinding)
        .function("RemoveVertex", &WebBindings::RemoveVertexBinding)
        .function("AddEdge", &WebBindings::AddEdgeBinding)
        .function("RemoveEdge", &WebBindings::RemoveEdgeBinding)
        .function("GetShortestPath", &WebBindings::GetShortestPathBinding);
}
