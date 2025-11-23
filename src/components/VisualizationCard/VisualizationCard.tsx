import type { FullereneListInfo } from "@/types/FullereneListInfo";
import { FullereneList } from "./components/FullereneList/FullereneList";
import { NoFullerenesGeneratedCard } from "./components/NoFullerenesGeneratedCard";
import { NoFullerenesSelectedCard } from "./components/NoFullerenesSelectedCard";
import { FullereneVisualizationCard } from "./components/FullereneVisualizationCard/FullereneVisualizationCard";
import { useState } from "react";
import type { Fullerene } from "@/types/Fullerene";

interface VisualizationCardProps {
    fullerenesListInfo: FullereneListInfo[];
}

export function VisualizationCard({ fullerenesListInfo }: VisualizationCardProps) {
    {

        const [fullerene, setFullerene] = useState<Fullerene | null>(null)

        return fullerenesListInfo.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                    <FullereneList
                        fullerenesListInfo={fullerenesListInfo} selectFullerene={setFullerene}
                    />
                </div>
                <div className="col-span-2">
                    {fullerene == null ? <NoFullerenesSelectedCard /> : <FullereneVisualizationCard selectedFullerene={fullerene} />}
                </div>
            </div>) :
            < NoFullerenesGeneratedCard />
    }
}