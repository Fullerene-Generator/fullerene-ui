import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import { ArrowLeft } from "lucide-react"
import { ClusteredFullerenesList } from "./ClusteredFullerenesList";
import { ExpandedFullerenesList } from "./ExpandedFullerenesList";
import { Input } from "@/components/ui/input";
import { getMetadataById } from "@/services/mockClient";
import { generateListOfFullerenes } from "@/services/mockClient";

interface FullereneListBrowserProps {
    fullerenesListInfo: FullereneCategory[];
    selectFullerene: Function;
}

type ViewMode = "clustered" | "single";

export function FullerenesList({ fullerenesListInfo, selectFullerene }: FullereneListBrowserProps) {

    const allFullerenesCount = fullerenesListInfo.map(e => e.count).reduce((a, b) => a + b)

    const [data, setData] = useState<FullereneItem[]>([])
    const [chosenFullerenesCount, setChosenFullerensCount] = useState<number>(0)
    const [ID, setID] = useState("");
    const [view, setView] = useState<ViewMode>("clustered");
    const [vertices, setVertices] = useState<number>(0)

    const clearData = () => {
        setView("clustered")
        setData([])
        setID("")
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

        setChosenFullerensCount(1)
        setData([metadata])
        setView("single")
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
                            <Input id="vertices" type="number" onChange={(e) => { setID(e.target.value) }} value={ID} />
                        </div>
                        <Button onClick={handleSearchByID}>Search</Button>
                    </div>
                </CardContent>
            </Card>
            <Button variant="outline" size="icon" aria-label="Submit" onClick={clearData}>
                <ArrowLeft />
            </Button>

            {
                (view === "clustered" ?
                    <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                        <ClusteredFullerenesList fullerenesListInfo={fullerenesListInfo}
                            fetchExpandedListData={async (type: ViewMode, n: number) => {
                                const res = await generateListOfFullerenes(n, 30, 0)
                                setData(res)
                                setView(type)
                                let count = fullerenesListInfo.find((f) => f.vertices === n)?.count
                                setChosenFullerensCount(count!)
                                setVertices(n)
                            }} /> </div> :
                    (
                        <ExpandedFullerenesList data={data}
                            selectFullerene={selectFullerene}
                            setData={setData}
                            fullerenesCount={chosenFullerenesCount}
                            vertices={vertices}
                        />
                    )
                )
            }
        </div>
    );
}

