import { useState, useCallback, useRef } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const DEPTS = ["Computer Science","Electrical Engineering","Mechanical Engineering","Civil Engineering","Business Administration","Economics","Mathematics","Physics","Chemistry","Biology","Psychology","Philosophy","Literature","Fine Arts"];
const PROGS = ["B.Sc.","B.A.","B.E.","B.Tech.","M.Sc.","M.A.","MBA","Ph.D."];
const YEARS = ["1st Year","2nd Year","3rd Year","4th Year","5th Year"];
const INIT = { collegeName:"", firstName:"", lastName:"", studentId:"", department:"", program:"", year:"", email:"", validUntil:"" };
const REQUIRED = ['collegeName','firstName','lastName','email','studentId','validUntil','department','program','year'];

function FormField({ label, id, type="text", value, onChange, options=null, placeholder="", error="" }) {
  const filled = value && value.trim() !== "";
  if (type === "select") return (
    <div className="form-field">
      <label htmlFor={id}>{label}{error && <span style={{color:'#ef4444',marginLeft:'.4rem',fontSize:'.72rem'}}>*</span>}</label>
      <select id={id} value={value} onChange={e => onChange(e.target.value)} className={filled ? "filled" : ""} style={error ? {borderColor:'#ef4444'} : {}}>
        <option value="">— Select —</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      {error && <span style={{color:'#ef4444',fontSize:'.72rem'}}>{error}</span>}
    </div>
  );
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{error && <span style={{color:'#ef4444',marginLeft:'.4rem',fontSize:'.72rem'}}>*</span>}</label>
      <input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={filled ? "filled" : ""} style={error ? {borderColor:'#ef4444'} : {}} />
      {error && <span style={{color:'#ef4444',fontSize:'.72rem'}}>{error}</span>}
    </div>
  );
}

function CardAvatar({ src }) {
  if (src) return <img src={src} className="card-avatar-img" alt="Student" />;
  return <div className="card-avatar-placeholder">🎓</div>;
}

function Barcode({ seed }) {
  const bars = Array.from({ length: 20 }, (_, i) => {
    const c = (seed.charCodeAt(i % Math.max(seed.length, 1)) || 50) + i * 7;
    return 7 + (c % 21);
  });
  const code = seed.toUpperCase().replace(/\s/g,"").slice(0,12).padEnd(12,"0");
  return (
    <div className="card-barcode">
      <div className="barcode-bars">{bars.map((h,i) => <span key={i} style={{height:`${h}px`}} />)}</div>
      <div className="barcode-num">{seed.length > 0 ? code : "············"}</div>
    </div>
  );
}

function InfoRow({ label, value, ph = "—" }) {
  return (
    <div className="card-info-row">
      <span className="ci-label">{label}</span>
      <span className={`ci-value ${!value ? "ph" : ""}`}>{value || ph}</span>
    </div>
  );
}

function IDCard({ data, photo, cardRef }) {
  const { collegeName, firstName, lastName, studentId, department, program, year, email, validUntil } = data;
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const college  = collegeName || "Your College Name";
  const seed     = studentId || firstName || "student";
  const validStr = validUntil
    ? new Date(validUntil + "-01").toLocaleDateString("en-US", { month:"short", year:"numeric" })
    : null;

  return (
    <div className="id-card" ref={cardRef}>
      <div className="card-hdr">
        <div className="card-college">
          <div className="card-college-name">{college}</div>
          <div className="card-college-tag">Official Student Identity Card</div>
        </div>
        <div className="card-logo-circle">🏛️</div>
      </div>
      <div className="card-stripe" />
      <div className="card-body-area">
        <div className="card-avatar-col">
          <CardAvatar src={photo} />
          <div className="card-degree-badge">{program || "Student"}</div>
        </div>
        <div className="card-info-col">
          <div className={`card-student-name ${!fullName ? "ph" : ""}`}>{fullName || "Full Name"}</div>
          <div className="card-info-rows">
            <InfoRow label="ID No." value={studentId} />
            <InfoRow label="Dept."  value={department} />
            <InfoRow label="Year"   value={year} />
            <InfoRow label="Email"  value={email} />
          </div>
        </div>
      </div>
      <div className="card-footer-area">
        <div className="card-validity">
          <div className="cv-label">Valid Until</div>
          <div className={`cv-value ${!validStr ? "ph" : ""}`}>{validStr || "MM / YYYY"}</div>
        </div>
        <Barcode seed={seed} />
      </div>
    </div>
  );
}

function ProgressBar({ fields }) {
  const filled = fields.filter(v => v && v.trim() !== "").length;
  const pct    = Math.round((filled / fields.length) * 100);
  const msg    = pct === 0 ? "Start filling in your details"
               : pct < 40 ? "Keep going…"
               : pct < 75 ? "Looking great!"
               : pct < 100 ? "Almost done!"
               : "Your card is complete 🎉";
  return (
    <div className="progress-wrap">
      <div className="progress-row"><span>{msg}</span><span>{pct}%</span></div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function PhotoUpload({ photo, onChange }) {
  const handleFile = e => {
    const f = e.target.files[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = ev => onChange(ev.target.result);
    reader.readAsDataURL(f);
  };
  return (
    <div className="photo-upload">
      <input type="file" accept="image/*" onChange={handleFile} />
      {photo ? (
        <>
          <img src={photo} className="upload-thumb" alt="Preview" />
          <div className="upload-label">Click to change photo</div>
        </>
      ) : (
        <div className="upload-label">
          <div className="icon">📷</div>
          Click to upload student photo
        </div>
      )}
    </div>
  );
}

export default function Generator() {
  const [form, setForm] = useState(INIT);
  const [photo, setPhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [downloading, setDownloading] = useState(false);
  const tiltRef = useRef(null);
  const wrapRef = useRef(null);
  const cardRef = useRef(null);

  const update = useCallback(field => value => setForm(p => ({ ...p, [field]: value })), []);
  const reset  = () => { setForm(INIT); setPhoto(null); setSubmitted(false); setErrors({}); };

  const validate = () => {
    const errs = {};
    REQUIRED.forEach(f => { if (!form[f] || form[f].trim() === '') errs[f] = 'Required'; });
    return errs;
  };

  const handleSubmit = () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        document.querySelector('.preview-col')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleMouseMove = e => {
    if (!tiltRef.current || !wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    tiltRef.current.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg) scale(1.02)`;
  };
  const handleMouseLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = '';
  };

  const handlePrint = () => {
    const card = cardRef.current;
    if (!card) return;
    let printArea = document.getElementById('print-area');
    if (!printArea) {
      printArea = document.createElement('div');
      printArea.id = 'print-area';
      document.body.appendChild(printArea);
    }
    printArea.innerHTML = '';
    printArea.appendChild(card.cloneNode(true));
    window.print();
  };

  const handleDownloadPDF = async () => {
    const card = cardRef.current;
    if (!card) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(card, { scale: 3, useCORS: true, backgroundColor: '#ffffff', logging: false });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [85.6, 54] });
      pdf.addImage(imgData, 'JPEG', 0, 0, 85.6, 54);
      pdf.save('college-id-card.pdf');
    } catch(e) {
      alert('PDF generation failed. Please try again.');
    }
    setDownloading(false);
  };

  return (
    <div className="gen-page">
      <div className="gen-header reveal">
        <div className="section-tag">🪪 ID Generator</div>
        <h1 className="section-heading">Create Your <span>College ID Card</span></h1>
        <p className="section-subtext" style={{ margin: '.75rem auto 0' }}>
          Fill in your details on the left. Your professional ID card renders live on the right.
        </p>
      </div>

      <div className="gen-layout">
        {/* Form Panel */}
        <div className="form-panel">
          <div className="panel-head">
            <div className="panel-head-icon">📋</div>
            <div>
              <h2>Student Details</h2>
              <p>All fields update the card instantly</p>
            </div>
          </div>

          <ProgressBar fields={Object.values(form)} />

          <div className="fg">
            <div className="form-section-label">🏛️ Institution</div>
            <div className="full">
              <FormField label="College / University Name" id="collegeName" value={form.collegeName} onChange={update("collegeName")} placeholder="e.g. State University" error={errors.collegeName} />
            </div>

            <div className="form-section-label">👤 Personal Info</div>
            <FormField label="First Name" id="firstName" value={form.firstName} onChange={update("firstName")} placeholder="Alice" error={errors.firstName} />
            <FormField label="Last Name"  id="lastName"  value={form.lastName}  onChange={update("lastName")}  placeholder="Johnson" error={errors.lastName} />
            <div className="full">
              <FormField label="Email Address" id="email" type="email" value={form.email} onChange={update("email")} placeholder="alice@university.edu" error={errors.email} />
            </div>

            <div className="form-section-label">🎓 Academic Details</div>
            <FormField label="Student ID"  id="studentId"  value={form.studentId}  onChange={update("studentId")}  placeholder="CS2024001" error={errors.studentId} />
            <FormField label="Valid Until" id="validUntil" type="month" value={form.validUntil} onChange={update("validUntil")} error={errors.validUntil} />
            <FormField label="Department"  id="department" type="select" value={form.department} onChange={update("department")} options={DEPTS} error={errors.department} />
            <FormField label="Degree"      id="program"    type="select" value={form.program}    onChange={update("program")}    options={PROGS} error={errors.program} />
            <div className="full">
              <FormField label="Year of Study" id="year" type="select" value={form.year} onChange={update("year")} options={YEARS} error={errors.year} />
            </div>

            <div className="form-section-label">📸 Photo (Optional)</div>
            <PhotoUpload photo={photo} onChange={setPhoto} />
          </div>

          <button onClick={handleSubmit} style={{ marginTop:'1.5rem', width:'100%', padding:'.9rem', background:'linear-gradient(135deg,#c8a84b,#f0d882)', border:'none', borderRadius:'12px', fontSize:'1rem', fontFamily:'inherit', fontWeight:'800', color:'#1a1a1a', cursor:'pointer', boxShadow:'0 4px 20px rgba(200,168,75,0.4)' }}>
            ✦ Generate My ID Card
          </button>
          <button className="btn-reset-form" onClick={reset}>↺ Reset All Fields</button>
        </div>

        {/* Preview Panel */}
        <div className="preview-col">
          <div className="preview-panel">
            <div className="panel-head">
              <div className="panel-head-icon">🪪</div>
              <div>
                <h2>Live Preview</h2>
                <p>Hover over the card to rotate it in 3D</p>
              </div>
            </div>

            <div className="preview-scene">
              <div className="id-card-wrapper" ref={el => { tiltRef.current = el; }} >
                <div ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                  <IDCard data={form} photo={photo} cardRef={cardRef} />
                </div>
              </div>
            </div>

            {submitted ? (
              <>
                <div className="preview-hint" style={{borderColor:'rgba(16,185,129,0.3)',background:'rgba(16,185,129,0.06)'}}>
                  <span className="hint-icon">✅</span>
                  Your ID card is ready! Download or print below.
                </div>
                <div style={{display:'flex', gap:'.75rem', marginTop:'.75rem'}}>
                  <button className="btn-download-pdf" style={{background:'linear-gradient(135deg,#1a3a6e,#2d5fa6)'}} onClick={handlePrint}>
                    🖨️ Print
                  </button>
                  <button className="btn-download-pdf" style={{background:'linear-gradient(135deg,#c8a84b,#f0d882)', color:'#1a1a1a'}} onClick={handleDownloadPDF} disabled={downloading}>
                    {downloading ? '⏳ Generating...' : '⬇️ Save as PDF'}
                  </button>
                </div>
              </>
            ) : (
              <div className="preview-hint">
                <span className="hint-icon">💡</span>
                Fill all fields and click <strong>Generate My ID Card</strong> to unlock download.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
