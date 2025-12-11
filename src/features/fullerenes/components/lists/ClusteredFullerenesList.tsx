import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { generateListOfFullerenes } from "@/services/mockClient";
import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";


interface FullereneOverviewListProps {
    fullerenesListInfo: FullereneCategory[];
    setLoading: Function;
    setActiveItem: Function;
    setData: Function;
}

export function ClusteredFullerenesList({ fullerenesListInfo, setLoading, setActiveItem, setData }: FullereneOverviewListProps) {

    const handleListElementClick = async (value: number) => {

        if (value === null) {
            setActiveItem(value);
            return;
        }
        setLoading(true)
        setActiveItem(value)
        const info = await generateListOfFullerenes(value)
        setData(info);
        setLoading(false)

    }

    return fullerenesListInfo.map((fullerene) => {
        return (
            <Card key={fullerene.vertices.toString()}
                className={`cursor-pointer transition-colors hover:bg-slate-50`}
            >
                <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <div className="flex gap-3 text-sm text-slate-600">
                                <span>{fullerene.vertices} vertices</span>
                                <span>count: {fullerene.count}</span>
                            </div>
                        </div>
                        <Button onClick={() => handleListElementClick(fullerene.vertices)}>
                            See Fullerenes
                        </Button>
                    </div>
                </CardContent>
            </Card>

        );
    })
}