
import type { FullereneInfo } from "../../types/FullereneInfo";
import { FullerenesListItem } from "./FullerenesListItem";
import { Pagination, PaginationPrevious, PaginationItem, PaginationContent, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { useState } from 'react'
import { generateListOfFullerenes } from "@/services/fullereneClient";

interface ExpandedFullerenesListProps {
    data: FullereneInfo[] | null;
    selectFullerene: Function;
    setData: Function
    fullerenesCount: number
    vertices: number
}

export function ExpandedFullerenesList({ data, selectFullerene, fullerenesCount, vertices, setData }: ExpandedFullerenesListProps) {

    const [currentPage, setCurrentPage] = useState(1)

    const maxPage = Math.ceil(fullerenesCount / 30)

    console.log("maxPage", maxPage)

    return (
        <>
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                <FullerenesListItem data={data} selectFullerene={selectFullerene} />
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={async () => {
                                if (currentPage != 1) {
                                    const res = await generateListOfFullerenes(vertices, 30, (currentPage - 2) * 30)
                                    setData(res)
                                    setCurrentPage(page => page - 1)
                                }
                            }}
                        />
                    </PaginationItem>
                    {currentPage != 1 && <PaginationItem>
                        <PaginationLink isActive={false} onClick={async () => {
                            const res = await generateListOfFullerenes(vertices, 30, (currentPage - 2) * 30)
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
                            const res = await generateListOfFullerenes(vertices, 30, currentPage * 30)
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
                                    const res = await generateListOfFullerenes(vertices, 30, currentPage * 30)
                                    setData(res)
                                    setCurrentPage(page => page + 1)
                                }
                            }}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </>
    )
}