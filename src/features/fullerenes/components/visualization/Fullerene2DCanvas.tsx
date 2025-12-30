import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import type { FullereneStructure } from "@/features/fullerenes/types/FullereneStructure";
import { useCallback } from "react";

interface FullereneVisualizerProps {
    fullerene: FullereneStructure;
    layout: string;
}

export function Fullerene2DCanvas({ fullerene, layout }: FullereneVisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cyRef = useRef<cytoscape.Core | null>(null);

    const dynamicStyleHandler = useCallback(() => {
        if (cyRef.current) {
            console.log("Zoom level:", cyRef.current.zoom());
            cyRef.current.style()
                .selector('node')
                .style({
                    'width': `${10 / cyRef.current.zoom()}px`,
                    'height': `${10 / cyRef.current.zoom()}px`,
                    'opacity': 1,
                })
                .selector('edge')
                .style({
                    'width': `${1 / cyRef.current.zoom()}px`,
                })
                .update();
        }
    }, []);

    const getLayoutOptions = (layoutName: string) => {
        if (layoutName === "preset") {
            return { name: "preset", fit: true };
        }
        else {
            return { name: layoutName };
        }
    }

    useEffect(() => {
        if (!containerRef.current) return;

        if (cyRef.current) {
            cyRef.current.destroy();
        }
        let i = -1;
        const elements = [
            ...fullerene.coords.map((coords) => {
                i++;
                return ({
                    data: {
                        id: i.toString(),
                    },
                    position: { x: coords[0] * 100, y: coords[1] * 100 }
                })
            }),

            ...fullerene.edges.map((edge, index) => ({
                data: {
                    id: `e${index}`,
                    source: edge[0],
                    target: edge[1],
                },
            })),
        ];

        const cy = cytoscape({
            container: containerRef.current,
            elements: elements,
            style: [
                {
                    selector: "node",
                    style: {
                        "background-color": "#3b82f6",
                        width: "10px",
                        height: "10px",
                    },
                },
                {
                    selector: "node.highlighted",
                    style: {
                        width: "10px",
                        height: "10px",
                        "background-color": "#1e40af",
                        "border-color": "#1e3a8a",
                        "border-width": 1,
                    },
                },
                {
                    selector: "edge",
                    style: {
                        "curve-style": "bezier",
                    },
                },
                {
                    selector: "edge.highlighted",
                    style: {
                        "line-color": "#3b82f6",
                    },
                },
            ],
            layout: getLayoutOptions(layout),
            userZoomingEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false,
        });

        cyRef.current = cy;

        dynamicStyleHandler();

        cy.on("zoom", dynamicStyleHandler);

        cy.on("tap", "node", (evt) => {
            const node = evt.target;
            const connectedEdges = node.connectedEdges();
            cy.elements().removeClass("highlighted");
            node.addClass("highlighted");
            connectedEdges.addClass("highlighted");
        });

        return () => {
            if (cyRef.current) {
                cyRef.current.destroy();
            }
        };
    }, [fullerene, layout]);

    return (
        <div className="w-full h-full border rounded-lg bg-white">
            <div ref={containerRef} className="w-full h-full min-h-[500px]" data-testid={"2D-canvas"} />
        </div>
    );
}

