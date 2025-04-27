import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { registerSW } from "virtual:pwa-register";


if ("serviceWorker" in window.navigator && !/localhost/.test(window.location.href)) {
  const updateSW = registerSW({
    onNeedRefresh() {
      updateSW(true);
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
