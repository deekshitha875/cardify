import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="nav-logo">
            <div className="nav-logo-icon">🎓</div>
            Cardify
          </div>
          <p>Professional college ID cards, generated instantly. Built with React, designed for students.</p>
          <div style={{ display: 'flex', gap: '.6rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <span className="badge badge-gold">React 19</span>
            <span className="badge badge-neon">No Backend</span>
            <span className="badge badge-purple">Open Source</span>
          </div>
        </div>
        <div className="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/generator">Generator</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/generator">Create ID Card</Link></li>
            <li><Link to="/how-it-works">Quick Guide</Link></li>
            <li><Link to="/about">Tech Stack</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Cardify · All rights reserved</span>
        <div className="footer-badges">
          <span className="footer-badge">🔒 Privacy First</span>
          <span className="footer-badge">⚡ No Sign-up</span>
          <span className="footer-badge">✦ 100% Free</span>
        </div>
      </div>
    </footer>
  );
}
