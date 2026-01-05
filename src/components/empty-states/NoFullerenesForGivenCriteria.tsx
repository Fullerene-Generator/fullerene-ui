import { Card, CardContent } from "../ui/card"

export function NoFullerenesForGivenCriteria() {
    return (<Card className="text-center py-12">
        <CardContent>
            <h2 className="text-2xl font-semibold mb-2 text-slate-900">
                No fullerenes found
            </h2>
            <p className="text-slate-600 max-w-md mx-auto">
                No fullerenes found for given criteria. The algorithm is still working or no fitting fullerene exists
            </p>
        </CardContent>
    </Card>);
}