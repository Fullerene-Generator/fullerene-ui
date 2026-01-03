import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { FullereneItem } from "@/features/fullerenes/types/FullereneItem";
import { useEffect, useRef, useCallback } from "react";
import { generateListOfFullerenes } from "@/services/mockClient";
import InfiniteScroll from "react-infinite-scroll-component";

interface DetailedFullereneListProps {
    data: FullereneItem[] | null;
    selectFullerene: Function;
    setData: Function;
    fullereneCount: number;
    desiredVertices: number;
    ID: String;
}

export function FullerenesListItem({ data, selectFullerene, setData, fullereneCount, desiredVertices, ID }: DetailedFullereneListProps) {

    const PAGE_SIZE = 5

    const setSelectedFullerene = async (id: number, n: number) => {
        selectFullerene({ id: id, n: n });
    }

    const fetchResultsInit = async () => {
        const res = await generateListOfFullerenes(desiredVertices, PAGE_SIZE, 0)
        setData(res)
        initialLoadCompleteRef.current = true
    }

    let pageRef = useRef(1)
    let processingRef = useRef(false)

    const sentinelRef = useRef<HTMLDivElement | null>(null)
    const initialLoadCompleteRef = useRef(false)
    const lastDesiredVertices = useRef(desiredVertices)

    useEffect(() => {
        if (lastDesiredVertices.current !== desiredVertices) {
            pageRef.current = 1
            initialLoadCompleteRef.current = false
            processingRef.current = false
            lastDesiredVertices.current = desiredVertices
        }
    })

    const fetchResults = async () => {
        const res = await generateListOfFullerenes(desiredVertices, PAGE_SIZE, pageRef.current * PAGE_SIZE)
        setData((prev: FullereneItem[]) => [...prev, ...res])
    }

    useEffect(() => {
        if (data?.length == 0) {
            fetchResultsInit()
        }
    }, [desiredVertices])


    const handleIntersection = useCallback(
        async (entries: IntersectionObserverEntry[]) => {
            if (initialLoadCompleteRef.current) {
                console.log("Intersection detected")
                const isIntersecting = entries[0]?.isIntersecting
                console.log("value of ref {} left {} right {} ID {}", pageRef.current, pageRef.current * PAGE_SIZE, fullereneCount, ID)
                if (isIntersecting && !processingRef.current && ID == "" && pageRef.current * PAGE_SIZE < fullereneCount) {
                    processingRef.current = true;
                    await fetchResults()
                    console.log("results fetched incrementing the pageRef")
                    pageRef.current += 1
                    console.log("current page ref: {}", pageRef.current)
                    processingRef.current = false
                }
            }
        },
        [fullereneCount, ID, desiredVertices]
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