import { createContext } from "react";

export const GenerationStateContext = createContext({ isGenerating: false, isInitialGenerationStarted: false })