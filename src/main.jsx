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
    <BrowserRouter basename="/explainers">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory-model" element={<MemoryModelApp />} />
        <Route path="/gestalt" element={<GestaltApp />} />
        <Route path="/prompt-cache" element={<PromptCacheApp />} />
        <Route path="/lsp" element={<LSPApp />} />
        <Route path="/token-optimization" element={<TokenOptimizationApp />} />
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
