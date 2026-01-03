import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneCategory } from "@/features/fullerenes/types/FullereneCategory";


interface FullereneOverviewListProps {
    fullerenesListInfo: FullereneCategory[];
    fetchExpandedListData: Function;
}

export function ClusteredFullerenesList({ fullerenesListInfo, fetchExpandedListData }: FullereneOverviewListProps) {



    const handleListElementClick = async (value: number) => {
        fetchExpandedListData("single", value);
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
                        <Button onClick={() => handleListElementClick(fullerene.vertices)} data-testid={`see-fullerene-${fullerene.vertices}`}>
                            See Fullerenes
                        </Button>
                    </div>
                </CardContent>
            </Card>

        );
    })
}