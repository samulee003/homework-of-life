import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import App from './App';
import Record from './pages/Record';
import Timeline from './pages/Timeline';
import Insights from './pages/Insights';
import Settings from './pages/Settings';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <BrowserRouter>
      <App />
      <Routes>
        <Route path="/" element={<Navigate to="/record" replace />} />
        <Route path="/record" element={<Record />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}


