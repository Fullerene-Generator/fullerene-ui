export interface FullereneNode {
    id: string;
    label: string;
}

export interface FullereneEdge {
    source: string;
    target: string;
}

export interface Fullerene {
    id: string;
    name: string;
    vertices: number;
    nodes: FullereneNode[];
    edges: FullereneEdge[];
}

