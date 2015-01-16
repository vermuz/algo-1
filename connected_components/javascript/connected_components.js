import {AdjacencyList} from './adjacency_list';

export function connectedComponents(graph) {
    if (graph.directed) {
        throw new Error('This algorithm only supports undirected graphs');
    }

    let list = new AdjacencyList(graph);

    let currentComponent = 0;
    let components = new Array(list.a.length);

    for (let x = 0; x < list.a.length; x++) {
        if (!isNaN(components[x])) {
            // This vertex has already been processed.
            continue;
        }

        // Mark this vertex and all connected vertices with the current component number.
        components[x] = currentComponent;
        list.depthFirstSearch(x, y => {
            components[y] = currentComponent;
        });

        currentComponent++;
    }

    return components;
}