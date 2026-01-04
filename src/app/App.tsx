import { Header } from "@/components/common/Header";
import { GenerationRequestCard } from "../features/fullerenes/components/generating/GenerationRequestCard";
import { useState, useEffect } from "react";
import { FullereneResultsContainer } from "../features/fullerenes/components/FullereneResultsContainer";
import { isAlgorithmRunning } from "@/services/fullereneClient";
function App() {

  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const checkIfIsGenerating = async () => {
      try {
        const response = await isAlgorithmRunning();
        console.log("State of algorithn: ", response)
        setIsGenerating(response.valueOf())

      } catch (error) {
        console.error("Error checking for generation:", error);
      }
    };
    const interval = setInterval(checkIfIsGenerating, 1000);

    return () => {
      clearInterval(interval);
    };
  })

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="container mx-auto p-6 max-w-7xl">
        <title>Fullerene generator</title>
        <Header />
        <GenerationRequestCard isGenerating={isGenerating} />
        <FullereneResultsContainer />
      </div>
    </div>
  );
}

export default App;
