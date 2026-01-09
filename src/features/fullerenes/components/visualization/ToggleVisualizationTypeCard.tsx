import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Fullerene2DVisualizationCard } from "./Fullerene2DVisualizationCard"
import { Fullerene3DVisualizationCard } from "./Fullerene3DVisualizationCard"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getMetadataById } from "@/services/fullereneClient"

interface RenderOptionToggleCardProps {
    selectedFullerene: string;
}

interface VisualizationComponentState {
    prev: string;
    current: string;
    next: string[]
}

export function ToggleVisualizationCard({ selectedFullerene }: RenderOptionToggleCardProps) {

    const [visualizationState, setVisualizationState] = useState<VisualizationComponentState>({ prev: "BASE", current: selectedFullerene, next: [] })

    useEffect(() => {

        console.log("Effects goes off with selectedFullerene: {}", selectedFullerene)
        const fetch = async () => {
            const metadata = await getMetadataById(selectedFullerene)
            setVisualizationState({ prev: metadata!.parent_id, current: selectedFullerene, next: [] })
        }

        fetch()
    }, [selectedFullerene]);

    return (
        <Tabs defaultValue="2D" className="flex flex-col h-full" data-testid={"Tabs"}>
            <Button onClick={async () => {
                const metadata = await getMetadataById(visualizationState.prev)
                setVisualizationState({ prev: metadata!.parent_id, current: visualizationState.prev, next: [...visualizationState.next, visualizationState.current] })

            }} disabled={visualizationState.prev === "BASE"}> Show parent </Button>
            <Button onClick={() => {
                var nextId = visualizationState.next[visualizationState.next.length - 1]
                setVisualizationState({ prev: visualizationState.current, current: nextId, next: visualizationState.next.slice(0, -1) })
            }} disabled={visualizationState.next.length === 0}> Show child </Button>
            <TabsList>
                <TabsTrigger value="2D" data-testid={"2D-tab"}>2D view</TabsTrigger>
                <TabsTrigger value="3D" data-testid={"3D-tab"}>3D view</TabsTrigger>
            </TabsList>
            <TabsContent value="2D" className="flex-1 h-full">
                <Fullerene2DVisualizationCard visualizedFullerene={visualizationState.current} />
            </TabsContent>
            <TabsContent value="3D" className="flex-1 h-full">
                <Fullerene3DVisualizationCard visualizedFullerene={visualizationState.current} />
            </TabsContent>
        </Tabs>
    )
}