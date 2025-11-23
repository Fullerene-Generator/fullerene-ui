import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FullereneVisualizer } from "./components/FullereneVisualizer";
import type { Fullerene } from "@/types/Fullerene";
import { Select, SelectGroup, SelectTrigger, SelectItem, SelectContent, SelectValue, SelectLabel } from "@/components/ui/select";
import { useState } from "react";

interface FullereneVisualizationCardProps {
    selectedFullerene: Fullerene;
}

export function FullereneVisualizationCard({ selectedFullerene }: FullereneVisualizationCardProps) {

    const [layout, setLayout] = useState<string>("circle")

    return (<Card>
        <CardHeader>
            <CardTitle>{selectedFullerene.name}</CardTitle>
            <CardDescription>
                Interactive 2D molecular structure visualization
            </CardDescription>
        </CardHeader>
        <CardContent>
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
            <div className="mb-4">
                <Select value={layout}
                    onValueChange={(v) => setLayout(v)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Layouts</SelectLabel>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="circle">Circle</SelectItem>
                            <SelectItem value="concentric">Concentric</SelectItem>
                            <SelectItem value="cose">COSE</SelectItem>
                            <SelectItem value="breadthfirst">Breadthfirst</SelectItem>
                            <SelectItem value="random">Random</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <FullereneVisualizer fullerene={selectedFullerene} layout={layout} />
        </CardContent>
    </Card>)
}