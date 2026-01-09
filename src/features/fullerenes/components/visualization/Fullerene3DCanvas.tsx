import { Canvas } from "@react-three/fiber"
import { OrbitControls, Line } from "@react-three/drei"
import type { FullereneStructure } from "../../types/FullereneStructure";

interface Fullerene3DProps {
    fullereneStructure: FullereneStructure;
}

export function Fullerene3DCanvas({ fullereneStructure }: Fullerene3DProps) {
    console.log(fullereneStructure.coords[0].length.toString())
    return (
        <Canvas className="w-full h-full min-h-[500px]" camera={{ position: [0, 0, 1] }} style={{ background: "black" }} data-testid={"3D-canvas"}>
            {fullereneStructure.coords.map((coords) => VertexMesh([coords[0], coords[1], coords[2]]))}
            {fullereneStructure.edges.map((edge) => {
                return EdgeMesh(
                    fullereneStructure.coords[edge[1]] as [number, number, number],
                    fullereneStructure.coords[edge[0]] as [number, number, number]
                )
            })}

            <OrbitControls />
            <axesHelper />
        </Canvas>)
}


function VertexMesh(position: [number, number, number]) {
    return (
        <>
            <mesh visible position={position}>
                <sphereGeometry args={[0.01, 16, 16]} />
                <meshBasicMaterial color={0x00ff00} />
            </mesh>
        </>)
}

function EdgeMesh(positionX: [number, number, number], positionY: [number, number, number]) {
    return (<Line points={[positionX, positionY]} color="white"></Line>)
}