use graph::{Edge, Graph};
use adjacency_matrix::AdjacencyMatrix;

use std::usize;

// maximum_flow returns the maximum flow from source to sink in g.
pub fn maximum_flow(g: &Graph, source: usize, sink: usize) -> u32 {
    // Initially, the residual flow graph of g is just the same as g.
    let mut residual_flow_graph = AdjacencyMatrix::from_graph(g);

    let mut flow = 0;
    loop {
        let path_capacity = residual_flow_graph.add_augmenting_path(source, sink);
        if path_capacity <= 0 {
            return flow;
        }
        flow += path_capacity;
    }
}

impl AdjacencyMatrix {
    // addAugmentingPath looks for an augmenting path from source to sink in the residual flow
    // graph.
    // If an augmenting path is found, addAugmentingPath updates the residual flow graph to reflect
    // the addition of the augmenting path, and returns the capacity of the augmenting path.
    // If no augmenting path is found, addAugmentingPath returns 0.
    fn add_augmenting_path(&mut self, source: usize, sink: usize) -> u32 {
        let mut parents = vec![usize::MAX; self.size()];

        for Edge { x, y } in self.breadth_first_search(source) {
            parents[y] = x;
            if y == sink {
                // Abort the BFS.
                break;
            }
        }

        // self.breadth_first_search(source, |Edge { x, y }| {
        //     parents[y] = x;
        //     // Return true to abort the BFS.
        //     y == sink
        // });

        self.substract_path(&parents, sink)
    }

    // substractPath substracts the path described by parents and end from the residual flow graph,
    // and returns the capacity of the path.
    fn substract_path(&mut self, parents: &Vec<usize>, end: usize) -> u32 {
        let capacity = self.path_capacity(parents, end);

        for Edge {x, y} in edges(parents, end) {
            self[x][y] -= capacity;
            self[y][x] += capacity;
        }

        capacity
    }

    // pathCapacity returns the capacity of the path described by parents and end in the residual
    // flow graph.
    fn path_capacity(&self, parents: &Vec<usize>, end: usize) -> u32 {
        let mut capacity = 0;

        for Edge {x, y} in edges(parents, end) {
            let edge_capacity = self[x][y];
            if capacity == 0 || capacity > edge_capacity {
                capacity = edge_capacity
            }
        }

        capacity
    }
}

// edges returns the edges of the path described by parents and end.
fn edges(parents: &Vec<usize>, mut end: usize) -> Vec<Edge> {
    let mut edges = vec![];

    while parents[end] < usize::MAX {
        let edge = Edge { x: parents[end], y: end };
        edges.push(edge);
        end = parents[end];
    }

    edges.reverse();
    edges
}