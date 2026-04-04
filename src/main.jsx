import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './shared/Nav'
import Home from './shared/Home'
import MemoryModelApp from './memory-model/App'
import GestaltApp from './gestalt/App'
import PromptCacheApp from './prompt-cache/App'
import LSPApp from './lsp/App'
import TokenOptimizationApp from './token-optimization/App'
import './memory-model/global.css'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/explainers" element={<Home />} />
        <Route path="/explainers/" element={<Home />} />
        <Route path="/explainers/memory-model" element={<MemoryModelApp />} />
        <Route path="/explainers/gestalt" element={<GestaltApp />} />
        <Route path="/explainers/prompt-cache" element={<PromptCacheApp />} />
        <Route path="/explainers/lsp" element={<LSPApp />} />
        <Route path="/explainers/token-optimization" element={<TokenOptimizationApp />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
