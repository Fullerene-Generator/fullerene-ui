import { useEffect, useRef } from "react";
import cytoscape from "cytoscape";
import type { Fullerene } from "@/types/Fullerene";

interface FullereneVisualizerProps {
    fullerene: Fullerene;
}

export function FullereneVisualizer({ fullerene }: FullereneVisualizerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cyRef = useRef<cytoscape.Core | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        if (cyRef.current) {
            cyRef.current.destroy();
        }

        const elements = [
            ...fullerene.nodes.map((node) => ({
                data: {
                    id: node.id
                },
            })),

            ...fullerene.edges.map((edge, index) => ({
                data: {
                    id: `e${index}`,
                    source: edge.source,
                    target: edge.target,
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
                        label: "data(label)",
                        color: "#fff",
                        "text-valign": "center",
                        "text-halign": "center",
                        "font-size": "10px",
                        width: "30px",
                        height: "30px",
                        "border-width": 2,
                        "border-color": "#1e40af",
                    },
                },
                {
                    selector: "node.highlighted",
                    style: {
                        "background-color": "#1e40af",
                        "border-color": "#1e3a8a",
                        "border-width": 3,
                    },
                },
                {
                    selector: "edge",
                    style: {
                        width: 2,
                        "line-color": "#94a3b8",
                        "target-arrow-color": "#94a3b8",
                        "curve-style": "bezier",
                    },
                },
                {
                    selector: "edge.highlighted",
                    style: {
                        "line-color": "#3b82f6",
                        width: 3,
                    },
                },
            ],
            layout: {
                name: "circle",
                animate: true,
                animationDuration: 500,
            },
            userZoomingEnabled: true,
            userPanningEnabled: true,
            boxSelectionEnabled: false,
        });

        cyRef.current = cy;

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
    }, [fullerene]);

    return (
        <div className="w-full h-full border rounded-lg bg-white">
            <div ref={containerRef} className="w-full h-full min-h-[500px]" />
        </div>
    );
}

