import {Graph, Edge, AdjacencyList} from './adjacency_list';

export default function minimumSpanningTreeEdges(graph: Graph): Edge[] {
    const list = new AdjacencyList(graph);

    const mstEdges: Edge[] = [];
    const mstVertices = new Array(graph.vertexCount).fill(false);

    // Start with vertex #0 in the MST.
    mstVertices[0] = true;

    while (true) {
        const edge = lightestCrossEdge(list, mstVertices);
        if (!edge) {
            break;
        }
        mstVertices[edge.x] = true;
        mstVertices[edge.y] = true;
        mstEdges.push(edge);
    }

    return mstEdges;
}

// lightestCrossEdge returns the minimum weight edge with exactly one vertex in the MST.
function lightestCrossEdge(list: AdjacencyList, mstVertices: boolean[]): Edge {
    let best: Edge = null;

    function processEdge(edge: Edge) {
        if (mstVertices[edge.x] !== mstVertices[edge.y] &&
            (!best || best.weight > edge.weight)) {
            best = edge;
        }
    }

    for (let edges of list.a) {
        edges.forEach(processEdge);
    }

    return best;
}
