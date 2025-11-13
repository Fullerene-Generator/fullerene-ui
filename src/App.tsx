import { Header } from "@/components/Header";
import { GeneratorCard } from "./components/GeneratorCard";
import type { FullereneListInfo } from "./types/FullereneListInfo";
import { useState } from "react";
import { VisualizationCard } from "./components/VisualizationCard/VisualizationCard";
function App() {

  const [fullerenesListInfo, setFullerenesListInfo] = useState<FullereneListInfo[]>([])

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="container mx-auto p-6 max-w-7xl">
        <Header />
        <GeneratorCard setFullerenesListInfo={setFullerenesListInfo} />
        <VisualizationCard fullerenesListInfo={fullerenesListInfo} />
      </div>
    </div>
  );
}

export default App;
