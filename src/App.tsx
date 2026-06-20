import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ASZF from './pages/ASZF';
import Privacy from './pages/Privacy';
import Disclaimer from './pages/Disclaimer';
import Partners from './pages/Partners';
import Eredmenyek from './pages/Eredmenyek';
import Weboldal from './pages/Weboldal';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/partnereink" element={<Partners />} />
          <Route path="/eredmenyek" element={<Eredmenyek />} />
          <Route path="/weboldal" element={<Weboldal />} />
          <Route path="/aszf" element={<ASZF />} />
          <Route path="/adatvedelem" element={<Privacy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
