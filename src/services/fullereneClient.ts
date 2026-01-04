import type { FullerenesClusteredListInfo } from "@/features/fullerenes/types/FullerenesClusteredListInfo";
import type { FullereneStructure } from "@/features/fullerenes/types/FullereneStructure";
import type { FullereneInfo } from "@/features/fullerenes/types/FullereneInfo";
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

interface FullerenesClusteredListInfoDto {
    vertices: number
    count: number;
}

export async function generateClusteredFullerenesList(): Promise<FullerenesClusteredListInfo[]> {

    const response = await axios.get<{ items: FullerenesClusteredListInfoDto[] }>("http://localhost:8000/counts");

    console.log("Received fullerene list info:", response.data);

    const info = response.data.items.map((dto): FullerenesClusteredListInfo => ({
        vertices: dto.vertices,
        count: dto.count
    }))

    return info;
}

interface FullereneInfoDto {
    id: string;
    parent_id: string;
    n: number;
    is_ipr: boolean;
}

export async function generateListOfFullerenes(vertices: number, limit: number, offset: number): Promise<FullereneInfo[]> {

    const response = await axios.get<{ metadata: FullereneInfoDto[] }>(`http://localhost:8000/fullerenes/${vertices}`, {
        params: {
            limit: limit,
            offset: offset
        }
    });

    console.log("Generating fullerene list for vertices: {}, limit: {}, offset {}", vertices, limit, offset);

    const metadata: FullereneInfo[] = response.data.metadata.map(
        (dto): FullereneInfo => ({
            id: dto.id,
            parent_id: dto.parent_id,
            n: dto.n,
            is_ipr: dto.is_ipr,
        })
    );

    return metadata;
}

export async function getMetadataById(id: string): Promise<FullereneInfo> {
    const response = await axios.get<{ metadata: FullereneInfo }>(`http://localhost:8000/fullerenes/ID/${id}`);
    console.log("Recieved metadata for ID: {}, metadata : {}", id, response.data);

    return response.data.metadata
}

interface FullereneStructureDto {
    id: string,
    n: number,
    edges: number[][],
    coords: [][],
    parent_id: string
}

export async function getFullereneFor3DVisualization(id: string): Promise<FullereneStructure> {

    const response = await axios.get<FullereneStructureDto>(`http://localhost:8000/fullerenes/3D/${id}`);
    const fullerene: FullereneStructure = {
        id: response.data.id,
        vertices: response.data.n,
        coords: response.data.coords,
        edges: response.data.edges,
        parent_id: response.data.parent_id
    }
    return fullerene
}

export async function getFullereneFor2DVisualization(id: string): Promise<FullereneStructure> {
    const response = await axios.get<FullereneStructureDto>(`http://localhost:8000/fullerenes/2D/${id}`);

    const fullerene: FullereneStructure = {
        id: response.data.id,
        vertices: response.data.n,
        coords: response.data.coords,
        edges: response.data.edges,
        parent_id: response.data.parent_id
    }

    return fullerene
}

