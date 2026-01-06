import type { FullerenesClusteredListInfo } from "@/features/fullerenes/types/FullerenesClusteredListInfo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContext, useState } from "react";
import type { FullereneInfo } from "@/features/fullerenes/types/FullereneInfo";
import { ArrowLeft } from "lucide-react"
import { ClusteredFullerenesList } from "./ClusteredFullerenesList";
import { ExpandedFullerenesList } from "./ExpandedFullerenesList";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { FilteringContext } from "@/features/filtering/FilteringContext";
import { NoFullerenesForGivenCriteria } from "@/components/empty-states/NoFullerenesForGivenCriteria";
import { SearchByIdContext } from "@/features/filtering/SearchByIdContext";
import { generateClusteredFullerenesList } from "@/services/fullereneClient";

interface FullereneListBrowserProps {
    fullerenesListInfo: FullerenesClusteredListInfo[];
    setFullerenesListInfo: Function
    setSelectedFullerene: Function;
    selectedFullerene: string | null;
    setIsIpr: Function;
}

type ViewMode = "clustered" | "single";

export function FullerenesList({ fullerenesListInfo, setFullerenesListInfo, setSelectedFullerene, selectedFullerene, setIsIpr }: FullereneListBrowserProps) {

    const allFullerenesCount = fullerenesListInfo.length > 0 ? fullerenesListInfo.map(e => e.count).reduce((a, b) => a + b) : 0

    const [data, setData] = useState<FullereneInfo[]>([])
    const [chosenFullerenesCount, setChosenFullerensCount] = useState<number>(0)
    const [ID, setID] = useState("");
    const [view, setView] = useState<ViewMode>("clustered");
    const [vertices, setVertices] = useState<number>(0)
    const [isSearchedById, setIsSearchedById] = useState<boolean>(false)
    const [searchedID, setSearchedID] = useState("")

    const isIpr = useContext(FilteringContext)

    const clearData = () => {
        setView("clustered")
        setData([])
        setID("")
        setIsSearchedById(false)
        setSearchedID("")
    }


    async function handleSearchByID() {
        setChosenFullerensCount(1)
        setIsSearchedById(true)
        setSearchedID(ID)
        console.log("Setting data: ", data)
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
                    <div className="flex gap-x-4 items-end pb-4">
                        <div className="flex-1 max-w-xs">
                            <label htmlFor="vertices" className="block text-sm font-medium mb-2">Provide ID:</label>
                            <Input id="vertices" onChange={(e) => { setID(e.target.value) }} value={ID} />
                        </div>
                        <Button onClick={handleSearchByID}>Search</Button>
                    </div>
                    <div className="flex gap-x-4 max-w-xs items-center">
                        <label htmlFor="IPRCheckbox">IPR: </label>
                        <Checkbox id="IPRCheckbox" defaultChecked={isIpr} onCheckedChange={async () => {
                            const response = await generateClusteredFullerenesList(!isIpr);
                            setFullerenesListInfo(response)
                            setIsIpr(!isIpr)

                        }} disabled={isSearchedById}></Checkbox>
                    </div>
                </CardContent>
            </Card>
            {view === "single" && <Button variant="outline" size="icon" aria-label="Submit" onClick={clearData}>
                <ArrowLeft />
            </Button>}

            {
                (view === "clustered" ?
                    (fullerenesListInfo.length > 0 ? <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                        <ClusteredFullerenesList fullerenesListInfo={fullerenesListInfo}
                            fetchExpandedListData={async (type: ViewMode, n: number) => {
                                setView(type)
                                let count = fullerenesListInfo.find((f) => f.vertices === n)?.count
                                setChosenFullerensCount(count!)
                                setVertices(n)
                            }} /> </div> : <NoFullerenesForGivenCriteria />) :
                    (
                        <SearchByIdContext value={{
                            ID: searchedID,
                            isSearchedById: isSearchedById
                        }}>
                            <ExpandedFullerenesList data={data}
                                setSelectedFullerene={setSelectedFullerene}
                                setData={setData}
                                fullerenesCount={chosenFullerenesCount}
                                vertices={vertices}
                                selectedFullerene={selectedFullerene}
                            />
                        </SearchByIdContext>
                    )
                )
            }
        </div>
    );
}

