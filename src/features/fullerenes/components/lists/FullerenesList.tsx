import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import { Spinner } from "../../../../components/ui/spinner";
import { ArrowLeft } from "lucide-react"
import { ClusteredFullerenesList } from "./ClusteredFullerenesList";
import { FullerenesListItem } from "./FullerenesListItem";

interface FullereneListBrowserProps {
    fullerenesListInfo: FullereneCategory[];
    selectFullerene: Function;
}


export function FullerenesList({ fullerenesListInfo, selectFullerene }: FullereneListBrowserProps) {

    const allFullerenesCount = fullerenesListInfo.map(e => e.count).reduce((a, b) => a + b)

    const [loading, setLoading] = useState<Boolean>(false)
    const [activeItem, setActiveItem] = useState<Number | null>(null)
    const [data, setData] = useState<FullereneItem[]>([])

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
                        (activeItem == null ? <ClusteredFullerenesList fullerenesListInfo={fullerenesListInfo} setActiveItem={setActiveItem} setData={setData} setLoading={setLoading} /> :
                            (<>
                                <Button variant="outline" size="icon" aria-label="Submit" onClick={setActiveItemNull}>
                                    <ArrowLeft />
                                </Button>
                                <FullerenesListItem fullerenesListElementInfo={data} selectFullerene={selectFullerene} />
                            </>
                            )
                        )
                }
            </div>
        </div>
    );
}

