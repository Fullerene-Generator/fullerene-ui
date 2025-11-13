import type { FullereneListInfo } from "@/types/FullereneListInfo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateListOfFullerenes, getFullereneForVisualization } from "@/utils/mockClient";
import type { FullereneListElementInfo } from "@/types/FullereneListElementInfo";
import { Spinner } from "../../../ui/spinner";
import { ArrowLeft } from "lucide-react"
import { FullereneGenerationOverviewList } from "./components/FullereneGenerationOverviewList";
import { DetailedFullereneList } from "./components/DetailedFullereneList";

interface FullereneListProps {
    fullerenesListInfo: FullereneListInfo[];
    selectFullerene: Function;
}


export function FullereneList({ fullerenesListInfo, selectFullerene }: FullereneListProps) {

    const allFullerenesCount = fullerenesListInfo.map(e => e.count).reduce((a, b) => a + b)

    const [loading, setLoading] = useState<Boolean>(false)
    const [activeItem, setActiveItem] = useState<Number | null>(null)
    const [data, setData] = useState<FullereneListElementInfo[]>([])

    const setActiveItemNull = () => {
        setActiveItem(null)
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <CardTitle>Generated Fullerenes</CardTitle>
                    <CardDescription>
                        {allFullerenesCount} fullerene{allFullerenesCount !== 1 ? "s" : ""} generated
                    </CardDescription>
                </CardHeader>
            </Card>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {
                    loading ? <Spinner /> :
                        (activeItem == null ? <FullereneGenerationOverviewList fullerenesListInfo={fullerenesListInfo} setActiveItem={setActiveItem} setData={setData} setLoading={setLoading} /> :
                            (<>
                                <Button variant="outline" size="icon" aria-label="Submit" onClick={setActiveItemNull}>
                                    <ArrowLeft />
                                </Button>
                                <DetailedFullereneList fullerenesListElementInfo={data} selectFullerene={selectFullerene} />
                            </>
                            )
                        )
                }
            </div>
        </div>
    );
}

