import { Card, CardContent } from "../ui/card"


interface NoFullereneForVerticesProps {
    vertices: number,
}

export function NoFullereneForGivenVerticesAndCriteria({ vertices }: NoFullereneForVerticesProps) {
    return (<Card className="text-center py-12">
        <CardContent>
            <h2 className="text-2xl font-semibold mb-2 text-slate-900">
                No fullerene found
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
                No fullerene found for {vertices} vertices matching given criteria
            </p>
        </CardContent>
    </Card>);
}