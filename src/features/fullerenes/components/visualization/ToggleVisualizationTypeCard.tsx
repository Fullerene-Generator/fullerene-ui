import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Fullerene2DVisualizationCard } from "./Fullerene2DVisualizationCard"
import { Fullerene3DVisualizationCard } from "./Fullerene3DVisualizationCard"
import type { FullereneStructure } from "../../types/FullereneStructure"

interface RenderOptionToggleCardProps {
    selectedFullerene: FullereneStructure;
}

export function ToggleVisualizationCard({ selectedFullerene }: RenderOptionToggleCardProps) {
    return (
        <Tabs defaultValue="2D" className="flex flex-col h-full">
            <TabsList>
                <TabsTrigger value="2D">2D view</TabsTrigger>
                <TabsTrigger value="3D">3D view</TabsTrigger>
            </TabsList>
            <TabsContent value="2D" className="flex-1 h-full">
                <Fullerene2DVisualizationCard selectedFullerene={selectedFullerene} />
            </TabsContent>
            <TabsContent value="3D" className="flex-1 h-full">
                <Fullerene3DVisualizationCard selectedFullerene={selectedFullerene} />
            </TabsContent>
        </Tabs>
    )
}