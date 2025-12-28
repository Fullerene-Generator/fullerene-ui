import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";

interface DetailedFullereneListProps {
    fullerenesListElementInfo: FullereneItem[] | null;
    selectFullerene: Function;
}

export function FullerenesListItem({ fullerenesListElementInfo, selectFullerene }: DetailedFullereneListProps) {

    const setSelectedFullerene = async (id: number, n: number) => {
        selectFullerene({ id: id, n: n });
    }
    return fullerenesListElementInfo?.map((fullerene) => {
        return (
            <Card
                key={fullerene.id}
            >
                <CardHeader>
                    <CardTitle className="text-base font-semibold tracking-tight">
                        Fullerene
                    </CardTitle>
                </CardHeader>

                <CardContent className="px-6 pb-6">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <div>
                                <span className="text-muted-foreground pr-2">ID:</span>
                                <span className="font-medium">{fullerene.id}</span>
                            </div>

                            <div>
                                <span className="text-muted-foreground pr-2">Vertices:</span>
                                <span className="font-medium">{fullerene.n}</span>
                            </div>
                        </div>

                        <Button
                            size="sm"
                            onClick={() => setSelectedFullerene(fullerene.id, fullerene.n)}
                        >
                            View
                        </Button>
                    </div>
                </CardContent>
            </Card>


        );
    })
}