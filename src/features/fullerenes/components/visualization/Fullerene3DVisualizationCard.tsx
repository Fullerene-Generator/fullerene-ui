import type { FullereneStructure } from '../../types/FullereneStructure'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Fullerene3DCanvas } from './Fullerene3DCanvas'

interface Fullerene3DRendererProps {
    selectedFullerene: FullereneStructure;
}


export function Fullerene3DVisualizationCard({ selectedFullerene }: Fullerene3DRendererProps) {
    return (

        <Card className="flex flex-col h-full">
            <CardHeader>
                <CardTitle>{selectedFullerene.vertices}</CardTitle>
                <CardDescription>
                    Interactive molecular structure visualization
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <div className="mb-4 p-3 bg-slate-50 rounded-md border">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium text-slate-600">Vertices:</span>{" "}
                            <span className="text-slate-900">{selectedFullerene.vertices}</span>
                        </div>
                        <div>
                            <span className="font-medium text-slate-600">Edges:</span>{" "}
                            <span className="text-slate-900">{selectedFullerene.edges.length}</span>
                        </div>
                    </div>
                </div>
                <div className="flex-1 border rounded-lg bg-white">
                    <Fullerene3DCanvas selectedFullerene={selectedFullerene} />
                </div>
            </CardContent>
        </Card>
    )
}