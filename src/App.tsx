import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTop from './components/ScrollToTop';

const ASZF = lazy(() => import('./pages/ASZF'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Partners = lazy(() => import('./pages/Partners'));
const Eredmenyek = lazy(() => import('./pages/Eredmenyek'));
const Weboldal = lazy(() => import('./pages/Weboldal'));

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-10 h-10 rounded-full border-2 border-slate-300 border-t-purple-500 animate-spin" />
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <ScrollToTop />
        <ErrorBoundary fallback={<div className="p-8 text-center text-slate-600">Something went wrong. Please refresh the page.</div>}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/partnereink" element={<Partners />} />
              <Route path="/eredmenyek" element={<Eredmenyek />} />
              <Route path="/weboldal" element={<Weboldal />} />
              <Route path="/aszf" element={<ASZF />} />
              <Route path="/adatvedelem" element={<Privacy />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </Router>
    </div>
  );
}

export default App;
