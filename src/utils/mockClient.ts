import type { FullereneListElementInfo } from "@/types/FullereneListElementInfo";
import type { Fullerene } from "@/types/Fullerene";

export async function generateFullereneListInfo(maxVertices: number) {

    await new Promise(resolve => setTimeout(resolve, 300));

    return [
        {
            vertices: 20,
            count: 1
        },
        {
            vertices: 50,
            count: 2
        },
    ];
}

export async function generateListOfFullerenes(vertices: number): Promise<FullereneListElementInfo[]> {
    console.log("Generating fullerene list for vertices: {}", vertices);
    await new Promise(resolve => setTimeout(resolve, 300));
    if (vertices === 20) {
        return [
            {
                id: 1,
                hashCode: "fiwheoifhewoihfoiew",
                description: "fulleren fajny"
            }
        ]
    } else {
        return [
            {
                id: 2,
                hashCode: "fiwhefjewjhfoiew",
                description: "fulleren fajny 2"
            },
            {
                id: 3,
                hashCode: "fidowqjdoihfoiew",
                description: "fulleren fajny 3"
            }
        ]
    }
}

export async function getFullereneForVisualization(id: number): Promise<Fullerene> {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (id == 1) {
        return C20;
    } else if (id == 2) {
        return C50_A;
    }
    return C50_B
}

// Helper to generate nodes
const makeNodes = (n: number): { id: string; label: string }[] =>
    Array.from({ length: n }, (_, i) => ({
        id: `${i + 1}`,
        label: `C${i + 1}`,
    }));

// --- C20: Dodecahedron (20 vertices, 30 edges)
export const C20 = {
    id: "C20",
    name: "Fullerene C20 (Dodecahedron)",
    vertices: 20,
    nodes: makeNodes(20),
    edges: [
        { source: "1", target: "2" }, { source: "1", target: "5" }, { source: "1", target: "6" },
        { source: "2", target: "3" }, { source: "2", target: "7" },
        { source: "3", target: "4" }, { source: "3", target: "8" },
        { source: "4", target: "5" }, { source: "4", target: "9" },
        { source: "5", target: "10" },
        { source: "6", target: "7" }, { source: "6", target: "11" },
        { source: "7", target: "8" }, { source: "8", target: "9" },
        { source: "9", target: "10" }, { source: "10", target: "11" },
        { source: "11", target: "12" }, { source: "12", target: "13" },
        { source: "13", target: "14" }, { source: "14", target: "15" },
        { source: "15", target: "16" }, { source: "16", target: "17" },
        { source: "17", target: "18" }, { source: "18", target: "19" },
        { source: "19", target: "20" }, { source: "20", target: "6" },
        { source: "12", target: "8" }, { source: "13", target: "9" },
        { source: "14", target: "10" }, { source: "15", target: "11" },
    ],
};

// --- C50-A: First non-isomorphic fullerene
export const C50_A = {
    id: "C50_A",
    name: "Fullerene C50 (isomer A, C2v symmetry)",
    vertices: 50,
    nodes: makeNodes(50),
    edges: [
        { source: "1", target: "2" }, { source: "1", target: "6" }, { source: "1", target: "7" },
        { source: "2", target: "3" }, { source: "2", target: "8" },
        { source: "3", target: "4" }, { source: "3", target: "9" },
        { source: "4", target: "5" }, { source: "4", target: "10" },
        { source: "5", target: "6" }, { source: "5", target: "11" },
        { source: "6", target: "12" }, { source: "7", target: "13" }, { source: "7", target: "14" },
        { source: "8", target: "15" }, { source: "8", target: "16" },
        { source: "9", target: "17" }, { source: "9", target: "18" },
        { source: "10", target: "19" }, { source: "10", target: "20" },
        { source: "11", target: "21" }, { source: "11", target: "22" },
        { source: "12", target: "23" }, { source: "12", target: "24" },
        { source: "13", target: "25" }, { source: "13", target: "26" },
        { source: "14", target: "27" }, { source: "14", target: "28" },
        { source: "15", target: "29" }, { source: "15", target: "30" },
        { source: "16", target: "31" }, { source: "16", target: "32" },
        { source: "17", target: "33" }, { source: "17", target: "34" },
        { source: "18", target: "35" }, { source: "18", target: "36" },
        { source: "19", target: "37" }, { source: "19", target: "38" },
        { source: "20", target: "39" }, { source: "20", target: "40" },
        { source: "21", target: "41" }, { source: "21", target: "42" },
        { source: "22", target: "43" }, { source: "22", target: "44" },
        { source: "23", target: "45" }, { source: "23", target: "46" },
        { source: "24", target: "47" }, { source: "24", target: "48" },
        { source: "25", target: "49" }, { source: "25", target: "50" },
        { source: "26", target: "27" }, { source: "27", target: "28" },
        { source: "28", target: "29" }, { source: "29", target: "30" },
        { source: "30", target: "31" }, { source: "31", target: "32" },
        { source: "32", target: "33" }, { source: "33", target: "34" },
        { source: "34", target: "35" }, { source: "35", target: "36" },
        { source: "36", target: "37" }, { source: "37", target: "38" },
        { source: "38", target: "39" }, { source: "39", target: "40" },
        { source: "40", target: "41" }, { source: "41", target: "42" },
        { source: "42", target: "43" }, { source: "43", target: "44" },
        { source: "44", target: "45" }, { source: "45", target: "46" },
        { source: "46", target: "47" }, { source: "47", target: "48" },
        { source: "48", target: "49" }, { source: "49", target: "50" },
        { source: "50", target: "26" },
    ],
};

// --- C50-B: Second non-isomorphic fullerene
export const C50_B = {
    id: "C50_B",
    name: "Fullerene C50 (isomer B, D3 symmetry)",
    vertices: 50,
    nodes: makeNodes(50),
    edges: [
        { source: "1", target: "2" }, { source: "1", target: "5" }, { source: "1", target: "10" },
        { source: "2", target: "3" }, { source: "2", target: "6" },
        { source: "3", target: "4" }, { source: "3", target: "7" },
        { source: "4", target: "5" }, { source: "4", target: "8" },
        { source: "5", target: "9" }, { source: "6", target: "11" }, { source: "6", target: "12" },
        { source: "7", target: "13" }, { source: "7", target: "14" },
        { source: "8", target: "15" }, { source: "8", target: "16" },
        { source: "9", target: "17" }, { source: "9", target: "18" },
        { source: "10", target: "19" }, { source: "10", target: "20" },
        { source: "11", target: "21" }, { source: "11", target: "22" },
        { source: "12", target: "23" }, { source: "12", target: "24" },
        { source: "13", target: "25" }, { source: "13", target: "26" },
        { source: "14", target: "27" }, { source: "14", target: "28" },
        { source: "15", target: "29" }, { source: "15", target: "30" },
        { source: "16", target: "31" }, { source: "16", target: "32" },
        { source: "17", target: "33" }, { source: "17", target: "34" },
        { source: "18", target: "35" }, { source: "18", target: "36" },
        { source: "19", target: "37" }, { source: "19", target: "38" },
        { source: "20", target: "39" }, { source: "20", target: "40" },
        { source: "21", target: "41" }, { source: "21", target: "42" },
        { source: "22", target: "43" }, { source: "22", target: "44" },
        { source: "23", target: "45" }, { source: "23", target: "46" },
        { source: "24", target: "47" }, { source: "24", target: "48" },
        { source: "25", target: "49" }, { source: "25", target: "50" },
        { source: "26", target: "27" }, { source: "27", target: "28" },
        { source: "28", target: "29" }, { source: "29", target: "30" },
        { source: "30", target: "31" }, { source: "31", target: "32" },
        { source: "32", target: "33" }, { source: "33", target: "34" },
        { source: "34", target: "35" }, { source: "35", target: "36" },
        { source: "36", target: "37" }, { source: "37", target: "38" },
        { source: "38", target: "39" }, { source: "39", target: "40" },
        { source: "40", target: "41" }, { source: "41", target: "42" },
        { source: "42", target: "43" }, { source: "43", target: "44" },
        { source: "44", target: "45" }, { source: "45", target: "46" },
        { source: "46", target: "47" }, { source: "47", target: "48" },
        { source: "48", target: "49" }, { source: "49", target: "50" },
        { source: "50", target: "26" },
    ],
};

// --- Mocked client
export const mockFullerenes = (): Fullerene[] => [C20, C50_A, C50_B];
