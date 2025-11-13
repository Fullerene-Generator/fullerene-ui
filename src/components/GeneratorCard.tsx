import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { generateFullereneListInfo } from "@/utils/mockClient";

interface GenerateCardProps {
    setFullerenesListInfo: Function;
}


export function GeneratorCard({ setFullerenesListInfo }: GenerateCardProps) {

    const [maxVertices, setMaxVertices] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);

    function handleGenerate() {

        const max = parseInt(maxVertices);

        if (isNaN(max) || max < 10) {
            alert("Please enter a valid number of vertices (minimum 10)");
            return;
        }

        setIsGenerating(true)

        setTimeout(async () => {
            const generated = await generateFullereneListInfo(max);
            console.log("Generated:", generated);
            setFullerenesListInfo(generated);
            setIsGenerating(false);
        }, 500);
    }

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle>
                    Generate Fullerenes
                </CardTitle>
                <CardDescription>
                    Specify the maximum vertices value to generate the sturctures
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-x-6 items-end">
                    <div className="flex-1 max-w-xs">
                        <label htmlFor="vertices" className="block text-sm font-medium mb-2">Maximum vertices:</label>
                        <Input id="vertices" type="number" onChange={(e) => setMaxVertices(e.target.value)} disabled={isGenerating} />
                    </div>
                    <Button onClick={handleGenerate} disabled={isGenerating} size="lg">
                        {!isGenerating ? "Generate" : "Generating..."}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}