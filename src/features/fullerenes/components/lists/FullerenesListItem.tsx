import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneInfo } from "@/features/fullerenes/types/FullereneInfo";

interface DetailedFullereneListProps {
    data: FullereneInfo[] | null;
    setSelectedFullerene: Function;
    selectedFullerene: string | null
}

export function FullerenesListItem({ data, setSelectedFullerene, selectedFullerene }: DetailedFullereneListProps) {

    return (
        <>
            {data?.map((fullerene) => {
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
                                    variant={selectedFullerene === fullerene.id ? "secondary" : "default"}
                                    onClick={() => setSelectedFullerene(fullerene.id)}
                                    disabled={selectedFullerene === fullerene.id}
                                >
                                    {selectedFullerene === fullerene.id ? "Selected" : "View"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>


                );
            })}
            { }
        </>
    )
}