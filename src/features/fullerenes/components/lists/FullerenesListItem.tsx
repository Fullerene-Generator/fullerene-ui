import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import { useEffect, useRef, useCallback } from "react";
import { generateListOfFullerenes } from "@/services/mockClient";

interface DetailedFullereneListProps {
    data: FullereneItem[] | null;
    selectFullerene: Function;
    setData: Function;
    setLoading: Function;
    fullereneCount: number;
    desiredVertices: number;
}

export function FullerenesListItem({ data, selectFullerene, setData, setLoading, fullereneCount, desiredVertices }: DetailedFullereneListProps) {

    const setSelectedFullerene = async (id: number, n: number) => {
        selectFullerene({ id: id, n: n });
    }

    const PAGE_SIZE = 5
    let pageRef = useRef(1)
    let processingRef = useRef(false)
    const sentinelRef = useRef<HTMLDivElement | null>(null)

    const fetchResultsInit = async () => {
        const res = await generateListOfFullerenes(desiredVertices, PAGE_SIZE, 0)
        setData(res)
    }

    const fetchResults = async () => {
        const res = await generateListOfFullerenes(desiredVertices, PAGE_SIZE, pageRef.current * PAGE_SIZE)
        setData((prev: FullereneItem[]) => [...prev, ...res])
    }

    useEffect(() => {
        fetchResultsInit()
    }, [])


    const handleIntersection = useCallback(
        async (entries: IntersectionObserverEntry[]) => {
            console.log("Intersection detected")
            const isIntersecting = entries[0]?.isIntersecting
            console.log("value of ref {} left {} right {}", pageRef.current, pageRef.current * PAGE_SIZE, fullereneCount)
            if (isIntersecting && !processingRef.current && pageRef.current * PAGE_SIZE < fullereneCount) {
                processingRef.current = true;
                await fetchResults()
                console.log("results fetched incrementing the pageRef")
                pageRef.current += 1
                console.log("current page ref: {}", pageRef.current)
                processingRef.current = false
            }
        },
        [fullereneCount]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersection)

        if (sentinelRef.current) {
            observer.observe(sentinelRef.current)
        }

        return () => observer.disconnect()
    }, [handleIntersection])



    return (
        <>
            {data?.map((fullerene) => {
                return (
                    <Card
                        key={fullerene.id}
                    >
                        <CardHeader>
                            <CardTitle className="text-base font-semibold tracking-tight">
                                Fullerene
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="px-6 pb-6">
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex-1 space-y-2">
                                    <div>
                                        <span className="text-muted-foreground pr-2">ID:</span>
                                        <span className="font-medium">{fullerene.id}</span>
                                    </div>

                                    <div>
                                        <span className="text-muted-foreground pr-2">Vertices:</span>
                                        <span className="font-medium">{fullerene.n}</span>
                                    </div>
                                </div>

                                <Button
                                    size="sm"
                                    onClick={() => setSelectedFullerene(fullerene.id, fullerene.n)}
                                >
                                    View
                                </Button>
                            </div>
                        </CardContent>
                    </Card>


                );
            })}
            {<div ref={sentinelRef} className="h-8"></div>}
        </>
    )
}