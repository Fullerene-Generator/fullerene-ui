import { useContext, useState } from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Input } from "../../../../components/ui/input";
import { generate, cancelGeneration } from "@/services/fullereneClient";
import { GenerationStateContext } from "@/features/generating/GenerationStateContext";

interface GenerateCardProps {
    setIsInitialGenerationStarted: Function
}


export function GenerationRequestCard({ setIsInitialGenerationStarted }: GenerateCardProps) {

    const [maxVertices, setMaxVertices] = useState("");

    const generationContext = useContext(GenerationStateContext)

    async function handleGenerate() {

        const max = parseInt(maxVertices);

        if (isNaN(max)) {
            alert("Please provide a numeric value")
        }

        if (max < 20) {
            alert("Please enter a valid number of vertices (minimum 20)");
            return;
        }

        setIsInitialGenerationStarted(true)

        await generate(max);
    }

    async function handleCancelGenerate() {
        await cancelGeneration()
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
                        <Input id="vertices" type="number" onChange={(e) => setMaxVertices(e.target.value)} disabled={generationContext.isGenerating} />
                    </div>
                    <Button onClick={handleGenerate} disabled={generationContext.isGenerating} size="lg">
                        {!generationContext.isGenerating ? "Generate" : "Generating..."}
                    </Button>
                    {
                        generationContext.isGenerating && <Button variant="destructive" size="lg" onClick={handleCancelGenerate}>Cancel</Button>
                    }
                </div>
            </CardContent>
        </Card>
    );
}