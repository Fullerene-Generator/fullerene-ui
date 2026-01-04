import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Fullerene2DVisualizationCard } from "./Fullerene2DVisualizationCard"
import { Fullerene3DVisualizationCard } from "./Fullerene3DVisualizationCard"
import { useEffect } from "react"
import { getFullereneFor2DVisualization, getFullereneFor3DVisualization } from "@/services/fullereneClient"
import { useState } from "react"
import type { FullereneStructure } from "../../types/FullereneStructure"
import { Button } from "@/components/ui/button"

interface RenderOptionToggleCardProps {
    selectedFullerene: string;
}

interface VisualizationComponentState {
    fullerene2D: FullereneStructure | null
    fullerene3D: FullereneStructure | null
    prev: string;
    current: string;
    next: string[]
}

export function ToggleVisualizationCard({ selectedFullerene }: RenderOptionToggleCardProps) {

    const [visualizationState, setVisualizationState] = useState<VisualizationComponentState>({ fullerene2D: null, fullerene3D: null, prev: "BASE", current: selectedFullerene, next: [] })
    const [visualizatonTypeState, setVisualizationTypeState] = useState<String>("2D")

    useEffect(() => {
        console.log("Effects goes off with selectedFullerene: {}", selectedFullerene)
        const fetch2D = async () => {
            var structure2D = await getFullereneFor2DVisualization(selectedFullerene)
            setVisualizationState({ fullerene2D: structure2D, fullerene3D: null, prev: structure2D.parent_id, current: selectedFullerene, next: [] })
        }
        const fetch3D = async () => {
            var structure3D = await getFullereneFor3DVisualization(selectedFullerene)
            setVisualizationState({ fullerene2D: null, fullerene3D: structure3D, prev: structure3D.parent_id, current: selectedFullerene, next: [] })
        }
        if (visualizatonTypeState == "2D") {
            fetch2D()
        } else {
            fetch3D()
        }
    }, [selectedFullerene]);

    async function handleVisualizationChange(value: String) {
        setVisualizationTypeState(value)
        console.log("Handling the change value: {}, curren: {}. 3Did: {}", value, visualizationState.current, visualizationState.fullerene3D?.id)
        if (value == "3D" && visualizationState.current != visualizationState.fullerene3D?.id) {
            var structure3D = await getFullereneFor3DVisualization(visualizationState.current)
            setVisualizationState({ fullerene2D: visualizationState.fullerene2D, fullerene3D: structure3D, prev: visualizationState.prev, current: visualizationState.current, next: visualizationState.next })
        } else if (value == "2D" && visualizationState.current != visualizationState.fullerene2D?.id) {
            var structure2D = await getFullereneFor2DVisualization(visualizationState.current)
            setVisualizationState({ fullerene2D: structure2D, fullerene3D: visualizationState.fullerene3D, prev: visualizationState.prev, current: visualizationState.current, next: visualizationState.next })
        }
    }


    return (
        <Tabs defaultValue="2D" className="flex flex-col h-full" onValueChange={handleVisualizationChange} data-testid={"Tabs"}>
            <Button onClick={async () => {
                if (visualizatonTypeState === "3D") {
                    var structure3D = await getFullereneFor3DVisualization(visualizationState.prev)
                    setVisualizationState({ fullerene2D: visualizationState.fullerene2D, fullerene3D: structure3D, prev: structure3D.parent_id, current: visualizationState.prev, next: [...visualizationState.next, visualizationState.current] })
                } else if (visualizatonTypeState === "2D") {
                    var structure2D = await getFullereneFor2DVisualization(visualizationState.prev)
                    setVisualizationState({ fullerene2D: structure2D, fullerene3D: visualizationState.fullerene3D, prev: structure2D.parent_id, current: visualizationState.prev, next: [...visualizationState.next, visualizationState.current] })
                }
            }} disabled={visualizationState.prev === "BASE"}> Show parent </Button>
            <Button onClick={async () => {
                var nextId = visualizationState.next[visualizationState.next.length - 1]
                if (visualizatonTypeState === "3D") {
                    var structure3D = await getFullereneFor3DVisualization(nextId)
                    setVisualizationState({ fullerene2D: visualizationState.fullerene2D, fullerene3D: structure3D, prev: structure3D.parent_id, current: nextId, next: visualizationState.next.slice(0, -1) })
                } else if (visualizatonTypeState === "2D") {
                    var structure2D = await getFullereneFor2DVisualization(nextId)
                    setVisualizationState({ fullerene2D: structure2D, fullerene3D: visualizationState.fullerene3D, prev: structure2D.parent_id, current: nextId, next: visualizationState.next.slice(0, -1) })
                }
            }} disabled={visualizationState.next.length === 0}> Show child </Button>
            <TabsList>
                <TabsTrigger value="2D" data-testid={"2D-tab"}>2D view</TabsTrigger>
                <TabsTrigger value="3D" data-testid={"3D-tab"}>3D view</TabsTrigger>
            </TabsList>
            <TabsContent value="2D" className="flex-1 h-full">
                <Fullerene2DVisualizationCard selectedFullerene={visualizationState.fullerene2D} />
            </TabsContent>
            <TabsContent value="3D" className="flex-1 h-full">
                <Fullerene3DVisualizationCard selectedFullerene={visualizationState.fullerene3D} />
            </TabsContent>
        </Tabs>
    )
}