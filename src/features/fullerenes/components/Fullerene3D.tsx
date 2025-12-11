import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import type { FullereneStructure } from "../types/FullereneStructure";

interface Fullerene3DProps {
    selectedFullerene: FullereneStructure;
}

export function Fullerene3D({ selectedFullerene }: Fullerene3DProps) {

    return (
        <Canvas className="w-full h-full min-h-[500px]" camera={{ position: [0, 0, 1] }} style={{ background: "black" }}>
            {selectedFullerene.coords3D.map(coords => VertexMesh(coords))}
            <OrbitControls />
            <axesHelper />
        </Canvas>)
}


function VertexMesh(position: [number, number, number]) {
    return (<mesh visible position={position}>
        <sphereGeometry args={[0.01, 16, 16]} />
        <meshBasicMaterial color={0x00ff00} />
    </mesh>)
}