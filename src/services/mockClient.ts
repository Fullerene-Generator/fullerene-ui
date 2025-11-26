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
    coords: number[][]
}

export async function getFullereneForVisualization(id: number, vertices: number): Promise<FullereneStructure> {
    const response = await axios.get<FullereneStructureDto>(`http://localhost:8000/fullerenes/${vertices}/${id}`);

    const fullerene: FullereneStructure = {
        vertices: response.data.n,
        coords: response.data.coords,
        edges: response.data.edges
    }

    return fullerene
}
