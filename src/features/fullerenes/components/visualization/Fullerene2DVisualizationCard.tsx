import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Fullerene2DCanvas } from "./Fullerene2DCanvas";
import type { FullereneStructure } from "@/features/fullerenes/types/FullereneStructure";
import { Select, SelectGroup, SelectTrigger, SelectItem, SelectContent, SelectValue, SelectLabel } from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { getFullereneFor2DVisualization } from "@/services/fullereneClient";

interface FullereneVisualizationCardProps {
    visualizedFullerene: string;
}

export function Fullerene2DVisualizationCard({ visualizedFullerene }: FullereneVisualizationCardProps) {

    const [layout, setLayout] = useState<string>("preset")
    const [fullereneStructure, setFullereneStructure] = useState<FullereneStructure | null>(null)

    useEffect(() => {
        const fetch = async () => {
            const structure = await getFullereneFor2DVisualization(visualizedFullerene, 0)
            setFullereneStructure(structure)
        }

        fetch()
    }, [visualizedFullerene])

    return fullereneStructure == null ? <Spinner /> : (

        <Card>
            <CardHeader>
                <CardTitle>{fullereneStructure.id}</CardTitle>
                <CardDescription>
                    Interactive 2D molecular structure visualization
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4 p-3 bg-slate-50 rounded-md border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-slate-600">Vertices:</span>{" "}
                            <span className="text-slate-900">{fullereneStructure.vertices}</span>
                        </div>
                        <div>
                            <span className="font-medium text-slate-600">Edges:</span>{" "}
                            <span className="text-slate-900">{fullereneStructure.edges.length}</span>
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <Select value={layout}
                        onValueChange={async (v) => {
                            setLayout(v)
                            if (v === "preset") {
                                const structure = await getFullereneFor2DVisualization(visualizedFullerene, 0)
                                setFullereneStructure(structure)
                            } else if (v === "force") {
                                const structure = await getFullereneFor2DVisualization(visualizedFullerene, 1)
                                setFullereneStructure(structure)
                            }
                        }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Layouts</SelectLabel>
                                <SelectItem value="preset">Preset</SelectItem>
                                <SelectItem value="force">Force</SelectItem>
                                <SelectItem value="grid">Grid</SelectItem>
                                <SelectItem value="circle">Circle</SelectItem>
                                <SelectItem value="cose">COSE</SelectItem>
                                <SelectItem value="random">Random</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <Fullerene2DCanvas fullereneStructure={fullereneStructure} layout={layout} />
            </CardContent>
        </Card>)
}