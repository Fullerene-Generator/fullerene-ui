import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneListElementInfo } from "@/types/FullereneListElementInfo";
import { getFullereneForVisualization } from "@/utils/mockClient";

interface DetailedFullereneListProps {
    fullerenesListElementInfo: FullereneListElementInfo[] | null;
    selectFullerene: Function;
}

export function DetailedFullereneList({ fullerenesListElementInfo, selectFullerene }: DetailedFullereneListProps) {

    const setSelectedFullerene = async (id: number) => {
        const graph = await getFullereneForVisualization(id);
        selectFullerene(graph);
    }
    return fullerenesListElementInfo?.map((fullerene) => {
        return (
            <Card key={fullerene.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-md hover:border-slate-300 bg-gradient-to-br from-white to-slate-50"
            >
                <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <div className="font-medium text-slate-900">
                                {fullerene.description}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                                    {fullerene.hashCode}
                                </span>
                            </div>
                        </div>
                        <Button
                            onClick={() => setSelectedFullerene(fullerene.id)}
                            className="shrink-0"
                        >
                            View
                        </Button>
                    </div>
                </CardContent>
            </Card>

        );
    })
}