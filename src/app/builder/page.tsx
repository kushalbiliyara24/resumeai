"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const STEPS = ["Your info", "Experience", "Job target", "Your resume"];

export default function Builder() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", location: "",
    title: "", summary: "",
    exp1_role: "", exp1_company: "", exp1_years: "", exp1_desc: "",
    exp2_role: "", exp2_company: "", exp2_years: "", exp2_desc: "",
    skills: "", education: "",
    targetJob: "", targetCompany: "", jobDescription: "",
  });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const generateResume = async () => {
    setLoading(true);
    setStep(3);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResume(data.resume || "Error generating resume. Please try again.");
    } catch {
      setResume("Error generating resume. Please check your API key and try again.");
    }
    setLoading(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10,
    padding: "11px 14px", color: "white", fontSize: 14,
    outline: "none", fontFamily: "DM Sans, sans-serif",
    transition: "border-color 0.2s",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase" as const, letterSpacing: "0.08em", marginBottom: 6, display: "block",
  };
  const textareaStyle: React.CSSProperties = { ...inputStyle, minHeight: 90, resize: "vertical" as const };

  return (
    <main style={{ minHeight: "100vh", background: "#0A0A0F", color: "white", fontFamily: "DM Sans, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.25); }
        input:focus, textarea:focus { border-color: rgba(0,229,255,0.4) !important; }
        .brand-text {
          background: linear-gradient(135deg, #00E5FF 0%, #A78BFA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .conx-sub {
          font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(135deg, #A78BFA, #7B5EA7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #00E5FF, #7B5EA7); color: white;
          font-weight: 600; font-size: 15px; padding: 13px 28px;
          border-radius: 100px; border: none; cursor: pointer; transition: all 0.2s;
          box-shadow: 0 0 32px rgba(0,229,255,0.2);
        }
        .btn-p:hover { transform: translateY(-1px); box-shadow: 0 0 48px rgba(0,229,255,0.32); }
        .btn-p:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
        .btn-g {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 500;
          padding: 12px 24px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.15);
          cursor: pointer; transition: all 0.2s;
        }
        .btn-g:hover { background: rgba(255,255,255,0.05); color: white; }
        .card { background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.08); border-radius: 20px; padding: 32px; }
        .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .spinner {
          width: 40px; height: 40px; border: 3px solid rgba(0,229,255,0.2);
          border-top-color: #00E5FF; border-radius: 50%; animation: spin 0.8s linear infinite;
          margin: 0 auto 20px;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .resume-output {
          background: white; color: #111; border-radius: 12px; padding: 40px;
          font-family: 'Georgia', serif; font-size: 14px; line-height: 1.7;
          white-space: pre-wrap; box-shadow: 0 20px 60px rgba(0,0,0,0.5);
        }
        @media(max-width:600px) { .row2 { grid-template-columns: 1fr; } }
      `}</style>

      {/* Top nav */}
      <div style={{ padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(255,255,255,0.06)", background: "rgba(10,10,15,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ cursor: "pointer", lineHeight: 1 }} onClick={() => router.push("/")}>
          <div style={{ fontFamily: "Instrument Serif, serif", fontSize: 20 }}>Resume<span className="brand-text">X</span></div>
          <div className="conx-sub">powered by ConXbyte</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 600,
                background: i === step ? "linear-gradient(135deg,#00E5FF,#7B5EA7)" : i < step ? "rgba(0,229,255,0.2)" : "rgba(255,255,255,0.06)",
                color: i <= step ? "white" : "rgba(255,255,255,0.3)",
              }}>{i < step ? "✓" : i + 1}</div>
              <span style={{ fontSize: 12, color: i === step ? "white" : "rgba(255,255,255,0.35)", display: window?.innerWidth > 600 ? "block" : "none" }}>{s}</span>
              {i < STEPS.length - 1 && <div style={{ width: 20, height: 1, background: "rgba(255,255,255,0.1)" }} />}
            </div>
          ))}
        </div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Step {step + 1} of {STEPS.length}</div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>

        {/* STEP 0: Personal info */}
        {step === 0 && (
          <div>
            <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>
              Let&apos;s start with <span className="brand-text">you</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 32, fontSize: 15 }}>Your basic info for the resume header.</p>
            <div className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="row2">
                  <div>
                    <label style={labelStyle}>Full name *</label>
                    <input style={inputStyle} placeholder="Alex Johnson" value={form.name} onChange={e => update("name", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Job title *</label>
                    <input style={inputStyle} placeholder="Senior Software Engineer" value={form.title} onChange={e => update("title", e.target.value)} />
                  </div>
                </div>
                <div className="row2">
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input style={inputStyle} placeholder="alex@email.com" value={form.email} onChange={e => update("email", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Phone</label>
                    <input style={inputStyle} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => update("phone", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Location</label>
                  <input style={inputStyle} placeholder="San Francisco, CA" value={form.location} onChange={e => update("location", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Education</label>
                  <input style={inputStyle} placeholder="B.S. Computer Science, Stanford University, 2016" value={form.education} onChange={e => update("education", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Key skills (comma separated)</label>
                  <input style={inputStyle} placeholder="React, Node.js, AWS, TypeScript, Python" value={form.skills} onChange={e => update("skills", e.target.value)} />
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
              <button className="btn-p" onClick={() => setStep(1)} disabled={!form.name || !form.title}>
                Next: Experience →
              </button>
            </div>
          </div>
        )}

        {/* STEP 1: Experience */}
        {step === 1 && (
          <div>
            <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>
              Your <span className="brand-text">work experience</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 32, fontSize: 15 }}>Add your 2 most recent jobs. AI will expand and polish them.</p>
            <div className="card" style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#00E5FF", marginBottom: 20 }}>Most recent job</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="row2">
                  <div>
                    <label style={labelStyle}>Job title *</label>
                    <input style={inputStyle} placeholder="Staff Engineer" value={form.exp1_role} onChange={e => update("exp1_role", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company *</label>
                    <input style={inputStyle} placeholder="Stripe" value={form.exp1_company} onChange={e => update("exp1_company", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Years</label>
                  <input style={inputStyle} placeholder="2021–Present" value={form.exp1_years} onChange={e => update("exp1_years", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>What did you do? (brief notes — AI expands this)</label>
                  <textarea style={textareaStyle} placeholder="Led payments team, built checkout flow, reduced latency by 40%, managed 5 engineers..." value={form.exp1_desc} onChange={e => update("exp1_desc", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="card">
              <div style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Previous job (optional)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="row2">
                  <div>
                    <label style={labelStyle}>Job title</label>
                    <input style={inputStyle} placeholder="Senior Engineer" value={form.exp2_role} onChange={e => update("exp2_role", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input style={inputStyle} placeholder="Airbnb" value={form.exp2_company} onChange={e => update("exp2_company", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Years</label>
                  <input style={inputStyle} placeholder="2018–2021" value={form.exp2_years} onChange={e => update("exp2_years", e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>What did you do?</label>
                  <textarea style={textareaStyle} placeholder="Built search infrastructure, improved ranking algorithm, A/B tested features..." value={form.exp2_desc} onChange={e => update("exp2_desc", e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button className="btn-g" onClick={() => setStep(0)}>← Back</button>
              <button className="btn-p" onClick={() => setStep(2)} disabled={!form.exp1_role || !form.exp1_company}>
                Next: Target job →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Target job */}
        {step === 2 && (
          <div>
            <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 36, fontWeight: 400, marginBottom: 8 }}>
              What job are you <span className="brand-text">applying for?</span>
            </h1>
            <p style={{ color: "rgba(255,255,255,0.45)", marginBottom: 32, fontSize: 15 }}>This helps AI tailor your resume perfectly to the role.</p>
            <div className="card">
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="row2">
                  <div>
                    <label style={labelStyle}>Target job title *</label>
                    <input style={inputStyle} placeholder="Senior Product Manager" value={form.targetJob} onChange={e => update("targetJob", e.target.value)} />
                  </div>
                  <div>
                    <label style={labelStyle}>Target company (optional)</label>
                    <input style={inputStyle} placeholder="Google, Meta, any startup..." value={form.targetCompany} onChange={e => update("targetCompany", e.target.value)} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Paste the job description (optional but recommended)</label>
                  <textarea style={{ ...textareaStyle, minHeight: 160 }} placeholder="Paste the full job description here. AI will tailor your resume to match exactly what they're looking for..." value={form.jobDescription} onChange={e => update("jobDescription", e.target.value)} />
                </div>
                <div style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 12, padding: "14px 18px", fontSize: 13, color: "rgba(0,229,255,0.8)" }}>
                  ✨ The more detail you give, the better your resume. AI will handle the rest!
                </div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
              <button className="btn-g" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-p" onClick={generateResume} disabled={!form.targetJob || loading}>
                {loading ? "Generating..." : "✨ Generate my resume →"}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Result */}
        {step === 3 && (
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <div className="spinner" />
                <h2 style={{ fontFamily: "Instrument Serif, serif", fontSize: 28, fontWeight: 400, marginBottom: 12 }}>
                  Writing your <span className="brand-text">perfect resume...</span>
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 15 }}>AI is tailoring every word to your target role. This takes about 15 seconds.</p>
              </div>
            ) : (
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                  <div>
                    <h1 style={{ fontFamily: "Instrument Serif, serif", fontSize: 32, fontWeight: 400, marginBottom: 4 }}>
                      Your resume is <span className="brand-text">ready! 🎉</span>
                    </h1>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>Tailored for: {form.targetJob}</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button className="btn-g" onClick={() => { setStep(0); setResume(""); }}>Start over</button>
                    <button className="btn-p" onClick={() => window.print()}>⬇ Download PDF</button>
                  </div>
                </div>
                <div className="resume-output">{resume}</div>
                <div style={{ marginTop: 24, background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 16, padding: "20px 24px" }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>Want to improve it further?</div>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["Write a cover letter", "Check ATS score", "Prep for interviews", "Optimize LinkedIn"].map(a => (
                      <button key={a} className="btn-g" style={{ fontSize: 13, padding: "8px 16px" }}>{a} →</button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

      </div>
    </main>
  );
}
