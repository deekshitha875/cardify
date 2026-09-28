import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Home() {
  const heroCardRef = useRef(null);
  const wrapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          const nums = entry.target.querySelectorAll('[data-target]');
          nums.forEach(n => {
            const t = parseInt(n.dataset.target);
            const suffix = n.dataset.suffix || '';
            const duration = 2000;
            const start = performance.now();
            const update = (now) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              n.textContent = Math.floor(eased * t).toLocaleString() + suffix;
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
            delete n.dataset.target;
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Hero counters
    setTimeout(() => {
      document.querySelectorAll('.hero-stat-num[data-target]').forEach(el => {
        const t = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();
        const update = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(e * t).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(update);
        };
        requestAnimationFrame(update);
        delete el.dataset.target;
      });
    }, 800);

    // 3D card tilt
    const card = heroCardRef.current;
    const wrap = wrapRef.current;
    const onMove = (e) => {
      if (!card || !wrap) return;
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 20}deg) rotateX(${-y * 20}deg) scale(1.04)`;
    };
    const onLeave = () => { if (card) card.style.transform = ''; };
    wrap?.addEventListener('mousemove', onMove);
    wrap?.addEventListener('mouseleave', onLeave);

    return () => {
      observer.disconnect();
      wrap?.removeEventListener('mousemove', onMove);
      wrap?.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const features = [
    { icon:'⚡', cls:'fi-gold',   title:'Instant Generation',      desc:'Watch your ID card build itself in real-time as you type. Zero waiting.' },
    { icon:'🎨', cls:'fi-neon',   title:'Professional Design',     desc:'Navy & gold premium theme with holographic stripe and decorative barcode.' },
    { icon:'📸', cls:'fi-purple', title:'Photo Upload',            desc:'Upload your student photo and see it appear directly on the card.' },
    { icon:'🏛️', cls:'fi-pink',   title:'Custom College Branding', desc:'Enter your college name and it appears prominently in the card header.' },
    { icon:'📋', cls:'fi-blue',   title:'Full Academic Details',   desc:'Department, program, year, student ID, email, validity — all fields.' },
    { icon:'✅', cls:'fi-green',  title:'Completeness Tracker',    desc:'A live progress bar shows how complete your card is.' },
  ];

  const testimonials = [
    { stars:'★★★★★', quote:'"I needed a mock ID card for a college project presentation and Cardify delivered something that looked more professional than I expected. Took me 2 minutes."', name:'Sarah Mitchell', role:'Computer Science, MIT', avatar:'👩‍🎓' },
    { stars:'★★★★★', quote:'"The real-time preview is incredible. You see every change instantly — the name, photo, department — it all snaps into place as you type."', name:'Carlos Rivera', role:'Web Dev Student, Stanford', avatar:'👨‍💻' },
    { stars:'★★★★★', quote:'"Our entire React class used Cardify as a reference for learning controlled forms and props. The code clearly demonstrates the concepts."', name:'Dr. Priya Nair', role:'CS Professor, IIT Delhi', avatar:'👩‍🏫' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero page">
        <div className="orb orb-blue" style={{width:'600px',height:'600px',top:'-200px',left:'-200px',opacity:'.35'}}></div>
        <div className="orb orb-gold" style={{width:'400px',height:'400px',top:'200px',right:'-150px',opacity:'.2'}}></div>
        <div className="hero-inner container">
          <div className="hero-content">
            <div className="hero-eyebrow">
              <div className="hero-eyebrow-dot"></div>
              Free · Instant · Professional
            </div>
            <h1 className="hero-title">
              Your College ID<br />
              <span className="line2">Reimagined.</span>
            </h1>
            <p className="hero-sub">
              Design stunning digital college identity cards in seconds.
              Fill in your details and watch your professional ID card come to life — no design skills needed.
            </p>
            <div className="hero-ctas">
              <Link to="/generator" className="btn btn-primary btn-lg">✦ Generate My ID Card</Link>
              <Link to="/how-it-works" className="btn btn-secondary btn-lg">See How It Works →</Link>
            </div>
            <div className="hero-stats">
              <div><div className="hero-stat-num" data-target="50000" data-suffix="+">0</div><div className="hero-stat-label">Cards Generated</div></div>
              <div><div className="hero-stat-num" data-target="200" data-suffix="+">0</div><div className="hero-stat-label">Colleges Served</div></div>
              <div><div className="hero-stat-num" data-target="99" data-suffix="%+">0</div><div className="hero-stat-label">% Satisfaction</div></div>
            </div>
          </div>

          {/* 3D Card Stack */}
          <div className="hero-visual">
            <div className="glow-ring glow-ring-1"></div>
            <div className="glow-ring glow-ring-2"></div>
            <div className="card-showcase-wrap" ref={wrapRef}>
              <div className="showcase-card showcase-card-3">
                <div className="sc-header"><div><div className="sc-college">Tech University</div><div className="sc-sub">Identity Card</div></div><div className="sc-logo-circle">🏛️</div></div>
                <div className="sc-stripe"></div>
                <div className="sc-body"><div className="sc-photo">👩</div><div className="sc-info"><div className="sc-name">Priya Sharma</div><div className="sc-rows"><div className="sc-row"><span className="sc-lbl">ID</span><span className="sc-val">TU2024089</span></div><div className="sc-row"><span className="sc-lbl">Dept</span><span className="sc-val">Electronics</span></div></div></div></div>
                <div className="sc-footer"><div className="sc-valid">Valid Until<span>Jun 2027</span></div></div>
              </div>
              <div className="showcase-card showcase-card-2">
                <div className="sc-header"><div><div className="sc-college">City College</div><div className="sc-sub">Identity Card</div></div><div className="sc-logo-circle">🏛️</div></div>
                <div className="sc-stripe"></div>
                <div className="sc-body"><div className="sc-photo">👨</div><div className="sc-info"><div className="sc-name">James Wilson</div><div className="sc-rows"><div className="sc-row"><span className="sc-lbl">ID</span><span className="sc-val">CC2024042</span></div><div className="sc-row"><span className="sc-lbl">Dept</span><span className="sc-val">Business</span></div></div></div></div>
                <div className="sc-footer"><div className="sc-valid">Valid Until<span>May 2026</span></div></div>
              </div>
              <div className="showcase-card showcase-card-1" ref={heroCardRef}>
                <div className="sc-header"><div><div className="sc-college">State University</div><div className="sc-sub">Official Identity Card</div></div><div className="sc-logo-circle">🏛️</div></div>
                <div className="sc-stripe"></div>
                <div className="sc-body">
                  <div className="sc-photo">🎓</div>
                  <div className="sc-info">
                    <div className="sc-name">Alice Johnson</div>
                    <div className="sc-rows">
                      <div className="sc-row"><span className="sc-lbl">ID No.</span><span className="sc-val">CS2024001</span></div>
                      <div className="sc-row"><span className="sc-lbl">Dept</span><span className="sc-val">Comp. Science</span></div>
                      <div className="sc-row"><span className="sc-lbl">Year</span><span className="sc-val">2nd Year</span></div>
                      <div className="sc-row"><span className="sc-lbl">Email</span><span className="sc-val">alice@su.edu</span></div>
                    </div>
                  </div>
                </div>
                <div className="sc-footer">
                  <div className="sc-valid">Valid Until<span>Dec 2026</span></div>
                  <div className="sc-bars">
                    {[14,20,10,18,22,8,16,20,12,18].map((h,i) => <b key={i} style={{height:`${h}px`}}></b>)}
                  </div>
                </div>
              </div>
              <div className="float-badge fb-1">⚡ Instant Preview</div>
              <div className="float-badge fb-2">✦ 100% Free</div>
              <div className="float-badge fb-3">🎨 3D Design</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }} className="reveal">
            <div className="section-tag">✦ Why Cardify</div>
            <h2 className="section-heading">Everything you need to create a <span>perfect ID card</span></h2>
            <p className="section-subtext" style={{ margin:'1rem auto 0' }}>No design tools. No templates. Just fill in your details and get a professional ID card instantly.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={f.title} className={`glass-card feature-card reveal reveal-delay-${(i % 3) + 1}`}>
                <div className={`feature-icon ${f.cls}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm">
        <div className="container">
          <div className="stats-row">
            {[{n:50000,s:'+',l:'ID Cards Generated'},{n:200,s:'+',l:'Colleges Worldwide'},{n:14,s:'',l:'Departments Supported'},{n:100,s:'%',l:'Free Forever'}].map((st,i) => (
              <div key={st.l} className={`glass-card stat-card reveal reveal-delay-${i+1}`}>
                <div className="stat-number" data-target={st.n} data-suffix={st.s}>0</div>
                <div className="stat-label">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign:'center', marginBottom:'3.5rem' }} className="reveal">
            <div className="section-tag">💬 Reviews</div>
            <h2 className="section-heading">Loved by <span>students everywhere</span></h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t, i) => (
              <div key={t.name} className={`glass-card testimonial-card reveal reveal-delay-${i+1}`}>
                <div className="testi-stars">{t.stars}</div>
                <p className="testi-quote">{t.quote}</p>
                <div className="testi-author">
                  <div className="testi-avatar">{t.avatar}</div>
                  <div><div className="testi-name">{t.name}</div><div className="testi-role">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm">
        <div className="container">
          <div className="cta-banner reveal">
            <div className="badge badge-gold" style={{ marginBottom:'1rem' }}>✦ Free Forever</div>
            <h2>Ready to create your <span className="grad-gold">perfect ID card?</span></h2>
            <p>Join thousands of students who've already generated their professional college ID with Cardify.</p>
            <div className="cta-actions">
              <Link to="/generator" className="btn btn-primary btn-lg">✦ Generate My ID Card</Link>
              <Link to="/how-it-works" className="btn btn-secondary btn-lg">See How It Works</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
