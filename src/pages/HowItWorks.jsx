import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function HowItWorks() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hiw-hero">
        <div className="section-tag reveal">📖 Guide</div>
        <h1 className="section-heading reveal">How <span>Cardify</span> Works</h1>
        <p className="section-subtext reveal" style={{ margin: '.9rem auto 0' }}>
          Three simple steps to go from blank form to a professional, print-ready college ID card.
          No accounts. No waiting. No design skills needed.
        </p>
        <div className="tech-tags reveal">
          {['⚡ React 19','🎨 CSS3 3D','🔄 Controlled Forms','📦 Props & State','🧩 Reusable Components','📸 FileReader API'].map(t => (
            <span key={t} className="tech-tag">{t}</span>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="section steps-section">
        <div className="steps-container">
          <div style={{ position: 'relative' }}>
            <div className="steps-line"></div>

            {/* Step 1 */}
            <div className="step-row reveal">
              <div className="step-content">
                <div className="badge badge-gold" style={{ marginBottom: '.75rem' }}>Step 01</div>
                <h3>Fill In Your Details</h3>
                <p>Enter your college name, full name, student ID, department, program, year of study, email, and validity date. Every keystroke instantly updates the live preview.</p>
                <div className="demo-box">
                  <div className="demo-field">
                    <div className="demo-label">First Name</div>
                    <div className="demo-input active">Alice<span className="demo-cursor"></span></div>
                  </div>
                  <div className="demo-field">
                    <div className="demo-label">Department</div>
                    <div className="demo-input">Computer Science ▾</div>
                  </div>
                </div>
              </div>
              <div className="step-center">
                <div className="step-node">📝</div>
                <div className="step-num">Step 1</div>
              </div>
              <div className="step-empty step-content" aria-hidden="true"><h3>-</h3><p>-</p></div>
            </div>

            {/* Step 2 */}
            <div className="step-row reveal">
              <div className="step-empty step-content" aria-hidden="true"><h3>-</h3><p>-</p></div>
              <div className="step-center">
                <div className="step-node">👁️</div>
                <div className="step-num">Step 2</div>
              </div>
              <div className="step-content">
                <div className="badge badge-neon" style={{ marginBottom: '.75rem' }}>Step 02</div>
                <h3>Watch the Live Preview</h3>
                <p>Your ID card renders in real-time on the right panel. Upload a photo and see it appear. Hover over the card to see the 3D tilt effect. Zero delay.</p>
                <div className="demo-box" style={{ padding: '.75rem' }}>
                  <div className="mini-card">
                    <div className="mc-hdr"><div><div className="mc-college">State University</div></div><div className="mc-logo">🏛️</div></div>
                    <div className="mc-stripe"></div>
                    <div className="mc-body">
                      <div className="mc-photo">🎓</div>
                      <div className="mc-info">
                        <div className="mc-name">Alice Johnson</div>
                        <div className="mc-rows">
                          <div className="mc-row"><span className="mc-l">ID</span><span className="mc-v">CS2024001</span></div>
                          <div className="mc-row"><span className="mc-l">Dept</span><span className="mc-v">Comp. Science</span></div>
                          <div className="mc-row"><span className="mc-l">Year</span><span className="mc-v">2nd Year</span></div>
                        </div>
                      </div>
                    </div>
                    <div className="mc-footer">Valid Until · Dec 2026</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-row reveal">
              <div className="step-content">
                <div className="badge badge-purple" style={{ marginBottom: '.75rem' }}>Step 03</div>
                <h3>Download or Print Your Card</h3>
                <p>Click <strong>Generate My ID Card</strong> after filling all fields. Then choose to print directly or download as a PDF — all without leaving the page.</p>
                <div className="download-demo">
                  <div className="dl-item">
                    <div className="dl-icon">🖨️</div>
                    <div className="dl-text"><div className="dl-title">Print Card</div><div className="dl-sub">Sends directly to your printer</div></div>
                    <div className="dl-arrow">→</div>
                  </div>
                  <div className="dl-item">
                    <div className="dl-icon">📄</div>
                    <div className="dl-text"><div className="dl-title">Save as PDF</div><div className="dl-sub">Downloads college-id-card.pdf instantly</div></div>
                    <div className="dl-arrow">→</div>
                  </div>
                </div>
              </div>
              <div className="step-center">
                <div className="step-node">✅</div>
                <div className="step-num">Step 3</div>
              </div>
              <div className="step-empty step-content" aria-hidden="true"><h3>-</h3><p>-</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }} className="reveal">
            <div className="section-tag">❓ FAQ</div>
            <h2 className="section-heading">Common <span>Questions</span></h2>
          </div>
          <div className="faq-grid">
            {[
              { q: "Is Cardify free to use?", a: "Yes — 100% free, forever. No account required, no hidden fees, no watermarks." },
              { q: "Is my data stored anywhere?", a: "No. Everything runs locally in your browser. Your details never leave your device." },
              { q: "Can I upload my own photo?", a: "Yes. Click the photo upload area to choose any image. It renders immediately on the card." },
              { q: "Why is the ID card live?", a: "The card uses React's controlled form pattern — every input is bound to state, so the card re-renders on every keystroke." },
              { q: "Can I customise the college name?", a: "Absolutely. There's a dedicated field for your college name — it appears in the card header." },
              { q: "Does it work on mobile?", a: "Yes. The layout is fully responsive. On smaller screens the form stacks above the preview." },
            ].map(({ q, a }, i) => (
              <div key={i} className={`glass-card faq-item reveal reveal-delay-${(i % 4) + 1}`}>
                <h4>{q}</h4>
                <p>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner reveal">
            <div className="badge badge-neon" style={{ marginBottom: '1rem' }}>Ready in 60 seconds</div>
            <h2>Now you know how it works —<br /><span className="grad-gold">let's make your card.</span></h2>
            <p>Takes less than a minute. No sign-up. No fees.</p>
            <div className="cta-actions">
              <Link to="/generator" className="btn btn-primary btn-lg">✦ Open Generator</Link>
              <Link to="/about" className="btn btn-secondary btn-lg">Learn About Cardify</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
