import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ParticleCanvas from './components/ParticleCanvas';
import Home from './pages/Home';
import Generator from './pages/Generator';
import HowItWorks from './pages/HowItWorks';
import About from './pages/About';
import './index.css';

// Cursor glow effect
function CursorGlow() {
  useEffect(() => {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    const onMove = e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);
  return <div className="cursor-glow" id="cursor-glow" />;
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function Layout() {
  return (
    <>
      <CursorGlow />
      <ParticleCanvas />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generator" element={<Generator />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about" element={<About />} />
        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
