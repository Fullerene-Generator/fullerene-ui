import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function NoFullerenesSelectedCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>No Fullerene Selected</CardTitle>
                <CardDescription>
                    Select a fullerene from the list to view its structure
                </CardDescription>
            </CardHeader>
        </Card>
    );
}