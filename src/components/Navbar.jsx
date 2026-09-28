import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (path) => location.pathname === path ? 'nav-link active' : 'nav-link';

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🎓</div>
          Cardify
        </Link>
        <ul className={`nav-links${menuOpen ? ' open' : ''}`} id="navLinks">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/how-it-works" className={isActive('/how-it-works')}>How It Works</Link></li>
          <li><Link to="/generator" className={isActive('/generator')}>Generator</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/generator" className="nav-cta btn">✦ Generate ID</Link></li>
        </ul>
        <button className="nav-mobile-btn" onClick={() => setMenuOpen(o => !o)}>☰</button>
      </div>
    </nav>
  );
}
