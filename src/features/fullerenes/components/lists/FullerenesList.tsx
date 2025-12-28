import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import { Spinner } from "../../../../components/ui/spinner";
import { ArrowLeft } from "lucide-react"
import { ClusteredFullerenesList } from "./ClusteredFullerenesList";
import { FullerenesListItem } from "./FullerenesListItem";
import { Input } from "@/components/ui/input";
import { getMetadataById } from "@/services/mockClient";

interface FullereneListBrowserProps {
    fullerenesListInfo: FullereneCategory[];
    selectFullerene: Function;
}


export function FullerenesList({ fullerenesListInfo, selectFullerene }: FullereneListBrowserProps) {

    const allFullerenesCount = fullerenesListInfo.map(e => e.count).reduce((a, b) => a + b)

    const [loading, setLoading] = useState<Boolean>(false)
    const [data, setData] = useState<FullereneItem[]>([])
    const [ID, setID] = useState("");

    const clearData = () => {
        setData([])
    }


    async function handleSearchByID() {

        const fullereneID = parseInt(ID);

        if (isNaN(fullereneID)) {
            alert("Please provide a numeric value")
        }

        if (fullereneID < 0) {
            alert("Please enter a valid ID");
            return;
        }

        const metadata = await getMetadataById(fullereneID);

        setData([metadata])
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
                <CardContent>
                    <div className="flex gap-x-4 items-end">
                        <div className="flex-1 max-w-xs">
                            <label htmlFor="vertices" className="block text-sm font-medium mb-2">Provide ID:</label>
                            <Input id="vertices" type="number" onChange={(e) => setID(e.target.value)} />
                        </div>
                        <Button onClick={handleSearchByID}>Search</Button>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {
                    loading ? <Spinner /> :
                        (data.length == 0 ? <ClusteredFullerenesList fullerenesListInfo={fullerenesListInfo} setData={setData} setLoading={setLoading} /> :
                            (<>
                                <Button variant="outline" size="icon" aria-label="Submit" onClick={clearData}>
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

