
import type { FullereneInfo } from "../../types/FullereneInfo";
import { FullerenesListItem } from "./FullerenesListItem";
import { Pagination, PaginationPrevious, PaginationItem, PaginationContent, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { useState, useEffect, useContext } from 'react'
import { generateListOfFullerenes } from "@/services/fullereneClient";
import { Spinner } from "@/components/ui/spinner";
import { FilteringContext } from "@/features/filtering/FilteringContext";
import { NoFullereneForGivenVerticesAndCriteria } from "@/components/empty-states/NoFullereneForGivenVerticesAndCriteria";

interface ExpandedFullerenesListProps {
    data: FullereneInfo[] | null;
    setSelectedFullerene: Function;
    setData: Function
    fullerenesCount: number
    vertices: number
    selectedFullerene: string | null
}

export function ExpandedFullerenesList({ data, setSelectedFullerene, fullerenesCount, vertices, setData, selectedFullerene }: ExpandedFullerenesListProps) {

    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const maxPage = Math.ceil(fullerenesCount / 30)

    const isIpr = useContext(FilteringContext)


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            const res = await generateListOfFullerenes(vertices, 30, (currentPage - 1) * 30, isIpr)
            setData(res)
            setLoading(false)
        }

        fetchData()

    }, [isIpr])

    return (
        !loading ? (data != null && data?.length > 0 ?
            <>
                <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    <FullerenesListItem data={data} setSelectedFullerene={setSelectedFullerene} selectedFullerene={selectedFullerene} />
                </div>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={async () => {
                                    if (currentPage != 1) {
                                        const res = await generateListOfFullerenes(vertices, 30, (currentPage - 2) * 30, isIpr)
                                        setData(res)
                                        setCurrentPage(page => page - 1)
                                    }
                                }}
                            />
                        </PaginationItem>
                        {currentPage != 1 && <PaginationItem>
                            <PaginationLink isActive={false} onClick={async () => {
                                const res = await generateListOfFullerenes(vertices, 30, (currentPage - 2) * 30, isIpr)
                                setData(res)
                                setCurrentPage(page => page - 1)
                            }}>
                                {currentPage - 1}
                            </PaginationLink>
                        </PaginationItem>}
                        <PaginationItem>
                            <PaginationLink isActive={true}>
                                {currentPage}
                            </PaginationLink>
                        </PaginationItem>
                        {currentPage != maxPage && <PaginationItem>
                            <PaginationLink isActive={false} onClick={async () => {
                                const res = await generateListOfFullerenes(vertices, 30, currentPage * 30, isIpr)
                                setData(res)
                                setCurrentPage(page => page + 1)
                            }}>
                                {currentPage + 1}
                            </PaginationLink>
                        </PaginationItem>}
                        <PaginationItem>
                            <PaginationNext
                                onClick={async () => {
                                    if (currentPage != maxPage) {
                                        const res = await generateListOfFullerenes(vertices, 30, currentPage * 30, isIpr)
                                        setData(res)
                                        setCurrentPage(page => page + 1)
                                    }
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            </> : <NoFullereneForGivenVerticesAndCriteria vertices={vertices} />) : <Spinner />
    )
}