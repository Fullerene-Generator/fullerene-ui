import type { FullereneStructure } from '../../types/FullereneStructure'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Fullerene3DCanvas } from './Fullerene3DCanvas'
import { Spinner } from '@/components/ui/spinner'
import { Select, SelectGroup, SelectTrigger, SelectItem, SelectContent, SelectValue, SelectLabel } from "@/components/ui/select";
import { useEffect, useState } from 'react';
import { getFullereneFor3DVisualization } from '@/services/fullereneClient';

interface Fullerene3DRendererProps {
    visualizedFullerene: string;
}


export function Fullerene3DVisualizationCard({ visualizedFullerene }: Fullerene3DRendererProps) {

    const [fullereneStructure, setFullereneStructure] = useState<FullereneStructure | null>(null)
    const [layout, setLayout] = useState<string>("preset")

    useEffect(() => {
        const fetch = async () => {
            const structure = await getFullereneFor3DVisualization(visualizedFullerene, 0)
            setFullereneStructure(structure)
        }
        console.log("Fetching the 3D structure")
        fetch()
    }, [visualizedFullerene])
    return (

        fullereneStructure == null ? <Spinner /> : <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{fullereneStructure.vertices}</CardTitle>
                <CardDescription>
                    Interactive 3D molecular structure visualization
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
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
                            console.log("value: ", v)
                            if (v === "preset") {
                                console.log("fetching for preset")
                                const structure = await getFullereneFor3DVisualization(visualizedFullerene, 0)
                                setFullereneStructure(structure)
                            } else if (v === "force") {
                                console.log("fetching for force")
                                const structure = await getFullereneFor3DVisualization(visualizedFullerene, 1)
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
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex-1 border rounded-lg bg-white">
                    <Fullerene3DCanvas fullereneStructure={fullereneStructure} />
                </div>
            </CardContent>
        </Card>
    )
}