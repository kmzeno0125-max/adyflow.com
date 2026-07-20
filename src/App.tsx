import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const ASZF = lazy(() => import('./pages/ASZF'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Disclaimer = lazy(() => import('./pages/Disclaimer'));
const Partners = lazy(() => import('./pages/Partners'));
const Eredmenyek = lazy(() => import('./pages/Eredmenyek'));
const Weboldal = lazy(() => import('./pages/Weboldal'));

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/partnereink" element={<Partners />} />
            <Route path="/eredmenyek" element={<Eredmenyek />} />
            <Route path="/weboldal" element={<Weboldal />} />
            <Route path="/aszf" element={<ASZF />} />
            <Route path="/adatvedelem" element={<Privacy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
