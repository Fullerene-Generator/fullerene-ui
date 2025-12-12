import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Fullerene2DVisualizationCard } from "./Fullerene2DVisualizationCard"
import { Fullerene3DVisualizationCard } from "./Fullerene3DVisualizationCard"
import type { FullereneIdentifier } from "../../types/FullereneIdentifier"
import { useEffect } from "react"
import { getFullereneFor2DVisualization, getFullereneFor3DVisualization } from "@/services/mockClient"
import { useState } from "react"
import type { FullereneStructure } from "../../types/FullereneStructure"

interface RenderOptionToggleCardProps {
    selectedFullerene: FullereneIdentifier;
}

interface VisualizationComponentState {
    fullerene2D: FullereneStructure | null
    fullerene3D: FullereneStructure | null
}

export function ToggleVisualizationCard({ selectedFullerene }: RenderOptionToggleCardProps) {

    const [visualizationState, setVisualizationState] = useState<VisualizationComponentState>({ fullerene2D: null, fullerene3D: null })
    const [visualizatonTypeState, setVisualizationTypeState] = useState<String>("2D")

    useEffect(() => {
        const fetch2D = async () => {
            var structure2D = await getFullereneFor2DVisualization(selectedFullerene.id, selectedFullerene.n)
            setVisualizationState({ fullerene2D: structure2D, fullerene3D: null })
        }
        const fetch3D = async () => {
            var structure3D = await getFullereneFor3DVisualization(selectedFullerene.id, selectedFullerene.n)
            setVisualizationState({ fullerene2D: null, fullerene3D: structure3D })
        }
        if (visualizatonTypeState == "2D") {
            fetch2D()
        } else {
            fetch3D()
        }
    }, [selectedFullerene]);

    async function handleVisualizationChange(value: String) {
        setVisualizationTypeState(value)
        if (value == "3D" && selectedFullerene.id != visualizationState.fullerene3D?.id) {
            var structure3D = await getFullereneFor3DVisualization(selectedFullerene.id, selectedFullerene.n)
            setVisualizationState({ fullerene2D: visualizationState.fullerene2D, fullerene3D: structure3D })
        } else if (value == "2D" && selectedFullerene.id != visualizationState.fullerene2D?.id) {
            var structure2D = await getFullereneFor2DVisualization(selectedFullerene.id, selectedFullerene.n)
            setVisualizationState({ fullerene2D: structure2D, fullerene3D: visualizationState.fullerene3D })
        }
    }
    return (
        <Tabs defaultValue="2D" className="flex flex-col h-full" onValueChange={handleVisualizationChange}>
            <TabsList>
                <TabsTrigger value="2D">2D view</TabsTrigger>
                <TabsTrigger value="3D">3D view</TabsTrigger>
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