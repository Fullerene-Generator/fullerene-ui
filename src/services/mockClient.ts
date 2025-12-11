import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";
import type { FullereneStructure } from "@/features/fullerenes/types/FullereneStructure";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import axios from "axios";

export async function generate(maxVertices: number) {
    console.log("Generating fullerenes with max vertices: {}", maxVertices);
    await axios.post("http://localhost:8000/generate", { max_n: maxVertices });
}

export async function isAlgorithmRunning(): Promise<Boolean> {
    const response = await axios.get("http://localhost:8000/isGenerating");
    return response.data
}

export async function cancelGeneration() {
    await axios.post("http://localhost:8000/cancel_generation")
}

export async function generateFullereneListInfo(): Promise<FullereneCategory[]> {

    const response = await axios.get<{ items: FullereneCategory[] }>("http://localhost:8000/counts");

    console.log("Received fullerene list info:", response.data);

    return response.data.items;
}

export async function generateListOfFullerenes(vertices: number): Promise<FullereneItem[]> {

    const response = await axios.get<{ metadata: FullereneItem[] }>(`http://localhost:8000/fullerenes/${vertices}`);
    console.log("Generating fullerene list for vertices: {}", vertices);

    return response.data.metadata;
}

interface FullereneStructureDto {
    id: number,
    n: number,
    edges: number[][],
    coords: number[][],
    coords3D: [number, number, number][]
}

export async function getFullereneForVisualization(id: number, vertices: number): Promise<FullereneStructure> {
    const response = await axios.get<FullereneStructureDto>(`http://localhost:8000/fullerenes/${vertices}/${id}`);

    const fullerene: FullereneStructure = {
        vertices: response.data.n,
        coords: response.data.coords,
        edges: response.data.edges,
        coords3D: [
            [-0.254618, 0.153901, -5.04554e-06],
            [-0.254618, 0.0475533, -0.14637],
            [-0.254618, -0.124512, -0.0904567],
            [-0.254618, -0.124506, 0.0904649],
            [-0.254618, 0.0475628, 0.146367],
            [-0.16442, 0.0853181, 0.262553],
            [-0.0901981, 0.255969, 0.18596],
            [-0.16442, 0.276067, -9.05067e-06],
            [-0.0901981, 0.255957, -0.185977],
            [-0.16442, 0.0853009, -0.262558],
            [-0.0901981, -0.0977791, -0.3009],
            [-0.16442, -0.223348, -0.162261],
            [-0.0901981, -0.316388, 1.03726e-05],
            [-0.16442, -0.223338, 0.162276],
            [-0.0901981, -0.0977594, 0.300906],
            [0.254618, 0.0475628, 0.146367],
            [0.16443, 0.0853181, 0.262553],
            [0.0901981, -0.0977594, 0.300906],
            [0.16442, -0.223338, 0.162276],
            [0.254618, -0.124506, 0.0904649],
            [0.254618, 0.153901, -5.04554e-06],
            [0.16442, 0.276067, -9.05067e-06],
            [0.0901981, 0.255969, 0.18596],
            [0.254618, 0.0475533, -0.14637],
            [0.16442, 0.0853009, -0.262558],
            [0.0901981, 0.255957, -0.185977],
            [0.254618, -0.124512, -0.0904567],
            [0.16442, -0.223348, -0.162261],
            [0.0901981, -0.0977791, -0.3009],
            [0.0901981, -0.316388, 1.03726e-05],
        ]

    }

    return fullerene
}
