<<<<<<< HEAD
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { StackHandler, StackProvider, StackTheme } from '@stackframe/react';
import { stackClientApp } from './stack';
import App from './App.tsx';
import './index.css';

function HandlerRoutes() {
  const location = useLocation();
  return (
    <StackHandler app={stackClientApp} location={location.pathname} fullPage />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>}>
      <BrowserRouter>
        <StackProvider app={stackClientApp}>
          <StackTheme>
            <Routes>
              <Route path="/handler/*" element={<HandlerRoutes />} />
              <Route path="/*" element={<App />} />
            </Routes>
          </StackTheme>
        </StackProvider>
      </BrowserRouter>
    </Suspense>
=======
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
>>>>>>> c3c673ea (feat: add GitHub and Google OAuth with Stack Auth)
  </StrictMode>
);
