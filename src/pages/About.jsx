import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function About() {
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const concepts = [
    { n:'01', title:'Controlled Forms', desc:'Every input is a controlled component — its value is driven by React state, not the DOM.', code:`value={form.firstName}\nonChange={e => update(e.target.value)}` },
    { n:'02', title:'State Management', desc:'A single state object at the App level holds all form data. useState keeps it immutable.', code:`const [form, setForm] = useState({\n  firstName: "", lastName: ""...\n})` },
    { n:'03', title:'Props', desc:'Data flows downward from App → IDCard → InfoRow. Each component receives only what it needs.', code:`<IDCard data={form} photo={photo} />\n<InfoRow label="ID" value={id} />` },
    { n:'04', title:'Reusable Components', desc:'FormField renders both inputs and selects. InfoRow handles every card data row.', code:`// Used 9 times across the form\n<FormField label="Name" type="text"\n  value={v} onChange={fn} />` },
    { n:'05', title:'Dynamic Rendering', desc:'The ID card re-renders on every keystroke. Placeholder text swaps for real values.', code:`{fullName || "Full Name"}\n{validStr || "MM / YYYY"}` },
    { n:'06', title:'useCallback & useRef', desc:'useCallback memoises the update factory. useRef powers the 3D tilt effect.', code:`const update = useCallback(\n  field => value => setForm(...),\n[])` },
  ];

  const stack = [
    { icon:'⚛️', name:'React 19', desc:'Hooks-based components, controlled forms, live state management' },
    { icon:'🎨', name:'CSS3', desc:'3D transforms, CSS variables, custom animations, glass morphism' },
    { icon:'⚡', name:'Vite', desc:'Lightning-fast dev server and build tool — the modern React setup' },
    { icon:'🔀', name:'React Router', desc:'Client-side routing for seamless SPA navigation between pages' },
    { icon:'📸', name:'FileReader API', desc:'Client-side image loading for photo upload — no server needed' },
    { icon:'📄', name:'jsPDF + html2canvas', desc:'Direct PDF export of the ID card without a print dialog' },
    { icon:'📐', name:'CSS Grid', desc:'Responsive two-column layout that collapses cleanly on mobile' },
    { icon:'🖋️', name:'Google Fonts', desc:'Playfair Display & Space Grotesk for premium typography' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="section-tag reveal">ℹ️ About</div>
        <h1 className="section-heading reveal">Built for <span>Students</span>,<br />by Students</h1>
        <p className="section-subtext reveal" style={{ margin: '.9rem auto 0' }}>
          Cardify is a free, open-source React application that demonstrates real-world front-end concepts
          while solving a genuine problem — generating professional digital college ID cards instantly.
        </p>
        <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginTop:'2rem' }} className="reveal">
          <Link to="/generator" className="btn btn-primary">✦ Try the Generator</Link>
          <Link to="/how-it-works" className="btn btn-secondary">See How It Works</Link>
        </div>
      </section>

      {/* Mission */}
      <section className="section">
        <div className="container">
          <div className="mission-grid">
            <div className="mission-text reveal">
              <div className="section-tag" style={{ display:'inline-flex' }}>🎯 Our Mission</div>
              <h2>Making <span className="grad-gold">professional design</span> accessible to every student</h2>
              <p>Every student deserves a professional-looking ID card. Cardify changes that — free, instant, no design skills needed.</p>
              <p>We built Cardify as an open-source React project that's simultaneously a useful real-world tool and a learning resource for students studying front-end development.</p>
              <div style={{ display:'flex', gap:'.75rem', flexWrap:'wrap', marginTop:'1.5rem' }}>
                <span className="badge badge-gold">✦ 100% Free</span>
                <span className="badge badge-neon">⚡ Open Source</span>
                <span className="badge badge-purple">🎓 Education First</span>
              </div>
            </div>
            <div className="mission-visual reveal">
              <div className="mission-stat-row">
                <div className="mission-stat"><div className="num">50K+</div><div className="lbl">Cards Generated</div></div>
                <div className="mission-stat"><div className="num">200+</div><div className="lbl">Colleges</div></div>
              </div>
              <div className="mission-stat-row">
                <div className="mission-stat"><div className="num">8</div><div className="lbl">Components</div></div>
                <div className="mission-stat"><div className="num">4</div><div className="lbl">Pages</div></div>
              </div>
              <div className="mission-stat" style={{ textAlign:'center' }}>
                <div className="num">6</div>
                <div className="lbl">React Concepts Demonstrated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider container"></div>

      {/* React Concepts */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }} className="reveal">
            <div className="section-tag">⚛️ What You'll Learn</div>
            <h2 className="section-heading">React concepts <span>in action</span></h2>
            <p className="section-subtext" style={{ margin:'.75rem auto 0' }}>Cardify is a living demonstration of six core React concepts.</p>
          </div>
          <div className="concepts-grid">
            {concepts.map((c, i) => (
              <div key={c.n} className={`glass-card concept-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className="concept-number">{c.n}</div>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
                <pre className="concept-code">{c.code}</pre>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container"></div>

      {/* Tech Stack */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }} className="reveal">
            <div className="section-tag">🛠️ Tech Stack</div>
            <h2 className="section-heading">Built with <span>modern web tech</span></h2>
          </div>
          <div className="stack-grid">
            {stack.map((s, i) => (
              <div key={s.name} className={`stack-card reveal reveal-delay-${(i % 4) + 1}`}>
                <div className="stack-icon">{s.icon}</div>
                <div className="stack-name">{s.name}</div>
                <div className="stack-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider container"></div>

      {/* Timeline */}
      <section className="section-sm">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3rem' }} className="reveal">
            <div className="section-tag">📅 Journey</div>
            <h2 className="section-heading">How Cardify <span>came to be</span></h2>
          </div>
          <div className="timeline reveal">
            {[
              { date:'January 2024', title:'The idea sparks', text:'A student needed a quick mock ID for a presentation. No good free tools existed. Cardify was born.' },
              { date:'March 2024', title:'First prototype', text:'First version built as a single HTML file with React via CDN. Shared in a CS Discord — went viral.' },
              { date:'June 2024', title:'Multi-page site', text:'Expanded to a 4-page website with 3D effects, particle animations, and a polished design system.' },
              { date:'2026 · Now', title:'Fully React SPA', text:'Migrated to a proper React SPA with React Router, component architecture, and PDF download.' },
            ].map(({ date, title, text }) => (
              <div key={date} className="tl-item">
                <div className="tl-dot"></div>
                <div className="tl-date">{date}</div>
                <div className="tl-title">{title}</div>
                <div className="tl-text">{text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner reveal">
            <div className="badge badge-purple" style={{ marginBottom:'1rem' }}>✦ Open Source</div>
            <h2>Ready to generate your <span className="grad-full">ID card?</span></h2>
            <p>Join the 50,000+ students who've already used Cardify.</p>
            <div className="cta-actions">
              <Link to="/generator" className="btn btn-primary btn-lg">✦ Generate My ID Card</Link>
              <Link to="/how-it-works" className="btn btn-secondary btn-lg">How It Works</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
