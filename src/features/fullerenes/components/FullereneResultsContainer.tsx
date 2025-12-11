import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";
import { FullerenesList } from "./lists/FullerenesList";
import { NoFullerenesGeneratedCard } from "../../../components/empty-states/NoFullerenesGeneratedCard";
import { NoFullerenesSelectedCard } from "../../../components/empty-states/NoFullerenesSelectedCard";
import { useEffect, useState } from "react";
import { generateFullereneListInfo } from "@/services/mockClient";
import type { FullereneStructure } from "@/features/fullerenes/types/FullereneStructure";
import { ToggleVisualizationCard } from "./visualization/ToggleVisualizationTypeCard";

export function FullereneResultsContainer() {
    {
        const [fullerenesListInfo, setFullerenesListInfo] = useState<FullereneCategory[]>([])
        const [fullerene, setFullerene] = useState<FullereneStructure | null>(null)

        useEffect(() => {
            const fetchResults = async () => {
                try {
                    const response = await generateFullereneListInfo();
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
                        fullerenesListInfo={fullerenesListInfo} selectFullerene={setFullerene}
                    />
                </div>
                <div className="col-span-2">
                    {fullerene == null ? <NoFullerenesSelectedCard /> : <ToggleVisualizationCard selectedFullerene={fullerene} />}
                </div>
            </div>) :
            < NoFullerenesGeneratedCard />
    }
}