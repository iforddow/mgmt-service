import { createRoot } from 'react-dom/client'
import './css/index.css'
import EntryPoint from "./components/layout/entry-point";

createRoot(document.getElementById('root')!).render(
  <EntryPoint />
)
