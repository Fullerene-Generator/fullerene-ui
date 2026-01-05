import { Card, CardContent } from "../ui/card"

export function NoFullerenesForGivenID() {
    return (<Card className="text-center py-12">
        <CardContent>
            <h2 className="text-2xl font-semibold mb-2 text-slate-900">
                No fullerene found
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
                No fullerenes found for given ID.
            </p>
        </CardContent>
    </Card>);
}