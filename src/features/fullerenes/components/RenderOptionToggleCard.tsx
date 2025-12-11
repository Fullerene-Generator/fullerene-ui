import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FullereneDetailCard } from "./FullereneDetailCard"
import { Fullerene3DRenderer } from "./Fullerene3DRenderer"
import { Button } from "@/components/ui/button"
import type { FullereneStructure } from "../types/FullereneStructure"

interface RenderOptionToggleCardProps {
    selectedFullerene: FullereneStructure;
}

export function RenderOptionToggleCard({ selectedFullerene }: RenderOptionToggleCardProps) {
    return (
        <Tabs defaultValue="2D" className="flex flex-col h-full">
            <TabsList>
                <TabsTrigger value="2D">2D view</TabsTrigger>
                <TabsTrigger value="3D">3D view</TabsTrigger>
            </TabsList>
            <TabsContent value="2D" className="flex-1 h-full">
                <FullereneDetailCard selectedFullerene={selectedFullerene} />
            </TabsContent>
            <TabsContent value="3D" className="flex-1 h-full">
                <Fullerene3DRenderer selectedFullerene={selectedFullerene} />
            </TabsContent>
        </Tabs>
    )
}