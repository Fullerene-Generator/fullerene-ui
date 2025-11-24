import { Card, CardContent } from "../ui/card"

export function NoFullerenesGeneratedCard() {
    return (<Card className="text-center py-12">
        <CardContent>
            <h2 className="text-2xl font-semibold mb-2 text-slate-900">
                Ready to Generate
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
                Enter a maximum vertex count above and click "Generate" to see the fullerenes
            </p>
        </CardContent>
    </Card>);
}