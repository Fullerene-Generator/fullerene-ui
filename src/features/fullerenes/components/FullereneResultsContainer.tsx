import type { FullerenesClusteredListInfo } from "@/features/fullerenes/types/FullerenesClusteredListInfo";
import { FullerenesList } from "./lists/FullerenesList";
import { NoFullerenesGeneratedCard } from "../../../components/empty-states/NoFullerenesGeneratedCard";
import { NoFullerenesSelectedCard } from "../../../components/empty-states/NoFullerenesSelectedCard";
import { useEffect, useState } from "react";
import { generateClusteredFullerenesList } from "@/services/fullereneClient";
import { ToggleVisualizationCard } from "./visualization/ToggleVisualizationTypeCard";
export function FullereneResultsContainer() {
    {
        const [fullerenesListInfo, setFullerenesListInfo] = useState<FullerenesClusteredListInfo[]>([])
        const [selectedFullerene, setSelectedFullerene] = useState<string | null>(null)

        useEffect(() => {
            const fetchResults = async () => {
                try {
                    const response = await generateClusteredFullerenesList();
                    setFullerenesListInfo(response)
                    console.log(response.length);

                } catch (error) {
                    console.error("Error fetching results:", error);
                }
            };
            console.log("fullereneListInfo length:", fullerenesListInfo.length);
            const interval = setInterval(fetchResults, 1000);

            return () => {
                clearInterval(interval);
            };
        })

        return fullerenesListInfo.length > 0 ? (
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                    <FullerenesList
                        fullerenesListInfo={fullerenesListInfo} setSelectedFullerene={setSelectedFullerene} selectedFullerene={selectedFullerene}
                    />
                </div>
                <div className="col-span-2">
                    {selectedFullerene == null ? <NoFullerenesSelectedCard /> : <ToggleVisualizationCard selectedFullerene={selectedFullerene} />}
                </div>
            </div>) :
            < NoFullerenesGeneratedCard />
    }
}