import type { FullerenesClusteredListInfo } from "@/features/fullerenes/types/FullerenesClusteredListInfo";
import { FullerenesList } from "./lists/FullerenesList";
import { NoFullerenesGeneratedCard } from "../../../components/empty-states/NoFullerenesGeneratedCard";
import { NoFullerenesSelectedCard } from "../../../components/empty-states/NoFullerenesSelectedCard";
import { useEffect, useState } from "react";
import { generateClusteredFullerenesList } from "@/services/fullereneClient";
import { ToggleVisualizationCard } from "./visualization/ToggleVisualizationTypeCard";
import { FilteringContext } from "@/features/filtering/FilteringContext";


interface FullereneResultsContainer {
    isInitialGenerationStarted: boolean
}

export function FullereneResultsContainer({ isInitialGenerationStarted }: FullereneResultsContainer) {
    {
        const [fullerenesListInfo, setFullerenesListInfo] = useState<FullerenesClusteredListInfo[]>([])
        const [selectedFullerene, setSelectedFullerene] = useState<string | null>(null)
        const [isIpr, setIsIpr] = useState<boolean>(false)

        useEffect(() => {
            const fetchResults = async () => {
                try {
                    const response = await generateClusteredFullerenesList(isIpr);
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
        }, [isIpr])

        return isInitialGenerationStarted ? (
            <div className="grid grid-cols-3 gap-6">
                <div className="col-span-1">
                    <FilteringContext value={isIpr}>
                        <FullerenesList
                            fullerenesListInfo={fullerenesListInfo} setSelectedFullerene={setSelectedFullerene} selectedFullerene={selectedFullerene} setIsIpr={setIsIpr}
                        />
                    </FilteringContext>
                </div>
                <div className="col-span-2">
                    {selectedFullerene == null ? <NoFullerenesSelectedCard /> : <ToggleVisualizationCard selectedFullerene={selectedFullerene} />}
                </div>
            </div>) :
            < NoFullerenesGeneratedCard />
    }
}