"use client";
import { useState, useEffect } from "react";

export const dynamic = "force-dynamic";

const STEPS = ["Your info", "Experience", "Job target", "Your resume"];

interface FormData {
  name: string; email: string; phone: string; location: string;
  title: string; education: string; skills: string;
  exp1_role: string; exp1_company: string; exp1_years: string; exp1_desc: string;
  exp2_role: string; exp2_company: string; exp2_years: string; exp2_desc: string;
  targetJob: string; targetCompany: string; jobDescription: string;
}

const empty: FormData = {
  name:"",email:"",phone:"",location:"",title:"",education:"",skills:"",
  exp1_role:"",exp1_company:"",exp1_years:"",exp1_desc:"",
  exp2_role:"",exp2_company:"",exp2_years:"",exp2_desc:"",
  targetJob:"",targetCompany:"",jobDescription:"",
};

export default function Builder() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [form, setForm] = useState<FormData>(empty);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  const update = (k: keyof FormData, v: string) => setForm(f => ({ ...f, [k]: v }));

  const generate = async () => {
    setLoading(true);
    setStep(3);
    try {
      const res = await fetch("/api/generate-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      setResume(data.resume || "Error generating resume.");
    } catch {
      setResume("Connection error. Please try again.");
    }
    setLoading(false);
  };

  const go = (url: string) => { window.location.href = url; };

  const inp: React.CSSProperties = {
    width:"100%",background:"rgba(255,255,255,0.05)",
    border:"1px solid rgba(255,255,255,0.12)",borderRadius:10,
    padding:"11px 14px",color:"white",fontSize:14,outline:"none",fontFamily:"inherit",
  };
  const lbl: React.CSSProperties = {
    fontSize:12,fontWeight:600,color:"rgba(255,255,255,0.5)",
    textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:6,display:"block",
  };
  const ta: React.CSSProperties = {...inp,minHeight:90,resize:"vertical"};

  return (
    <main style={{minHeight:"100vh",background:"#0A0A0F",color:"white",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.25);}
        input:focus,textarea:focus{border-color:rgba(0,229,255,0.4)!important;outline:none;}
        .brand{background:linear-gradient(135deg,#00E5FF,#A78BFA);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .conx{font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;background:linear-gradient(135deg,#A78BFA,#7B5EA7);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .bp{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#00E5FF,#7B5EA7);color:white;font-weight:600;font-size:15px;padding:13px 28px;border-radius:100px;border:none;cursor:pointer;transition:all 0.2s;font-family:inherit;}
        .bp:hover{transform:translateY(-1px);}
        .bp:disabled{opacity:0.4;cursor:not-allowed;transform:none;}
        .bg{display:inline-flex;align-items:center;gap:8px;background:transparent;color:rgba(255,255,255,0.6);font-size:14px;font-weight:500;padding:12px 24px;border-radius:100px;border:1px solid rgba(255,255,255,0.15);cursor:pointer;transition:all 0.2s;font-family:inherit;}
        .bg:hover{background:rgba(255,255,255,0.05);color:white;}
        .card{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;}
        .r2{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
        .f{display:flex;flex-direction:column;}
        .spin{width:40px;height:40px;border:3px solid rgba(0,229,255,0.2);border-top-color:#00E5FF;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 20px;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .rout{background:white;color:#111;border-radius:12px;padding:40px;font-family:Georgia,serif;font-size:14px;line-height:1.7;white-space:pre-wrap;}
        @media(max-width:600px){.r2{grid-template-columns:1fr;}}
        @media print{nav,#actions{display:none!important;}.rout{box-shadow:none;}}
      `}</style>

      {/* NAV */}
      <nav style={{padding:"0 32px",height:64,display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.06)",background:"rgba(10,10,15,0.9)",backdropFilter:"blur(20px)",position:"sticky",top:0,zIndex:100}}>
        <div style={{cursor:"pointer",lineHeight:1}} onClick={() => go("/")}>
          <div style={{fontFamily:"Instrument Serif,serif",fontSize:20}}>Resume<span className="brand">X</span></div>
          <div className="conx">powered by ConXbyte</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6}}>
          {STEPS.map((s,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:6}}>
              <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:600,background:i===step?"linear-gradient(135deg,#00E5FF,#7B5EA7)":i<step?"rgba(0,229,255,0.2)":"rgba(255,255,255,0.06)",color:i<=step?"white":"rgba(255,255,255,0.3)"}}>
                {i<step?"✓":i+1}
              </div>
              {i<STEPS.length-1&&<div style={{width:16,height:1,background:"rgba(255,255,255,0.1)"}}/>}
            </div>
          ))}
        </div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.3)"}}>Step {step+1}/{STEPS.length}</div>
      </nav>

      <div style={{maxWidth:720,margin:"0 auto",padding:"48px 24px"}}>

        {/* STEP 0 */}
        {step===0&&(
          <div>
            <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:36,fontWeight:400,marginBottom:8}}>Let&apos;s start with <span className="brand">you</span></h1>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:32}}>Your basic info for the resume header.</p>
            <div className="card">
              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                <div className="r2">
                  <div className="f"><label style={lbl}>Full name *</label><input style={inp} placeholder="Alex Johnson" value={form.name} onChange={e=>update("name",e.target.value)}/></div>
                  <div className="f"><label style={lbl}>Current job title *</label><input style={inp} placeholder="Software Engineer" value={form.title} onChange={e=>update("title",e.target.value)}/></div>
                </div>
                <div className="r2">
                  <div className="f"><label style={lbl}>Email</label><input style={inp} placeholder="alex@email.com" value={form.email} onChange={e=>update("email",e.target.value)}/></div>
                  <div className="f"><label style={lbl}>Phone</label><input style={inp} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e=>update("phone",e.target.value)}/></div>
                </div>
                <div className="f"><label style={lbl}>Location</label><input style={inp} placeholder="San Francisco, CA" value={form.location} onChange={e=>update("location",e.target.value)}/></div>
                <div className="f"><label style={lbl}>Education</label><input style={inp} placeholder="B.S. Computer Science, Stanford, 2016" value={form.education} onChange={e=>update("education",e.target.value)}/></div>
                <div className="f"><label style={lbl}>Skills (comma separated)</label><input style={inp} placeholder="React, Node.js, AWS, TypeScript" value={form.skills} onChange={e=>update("skills",e.target.value)}/></div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"flex-end",marginTop:24}}>
              <button className="bp" onClick={()=>setStep(1)} disabled={!form.name||!form.title}>Next: Experience →</button>
            </div>
          </div>
        )}

        {/* STEP 1 */}
        {step===1&&(
          <div>
            <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:36,fontWeight:400,marginBottom:8}}>Your <span className="brand">work experience</span></h1>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:32}}>Add your most recent jobs. AI will expand them.</p>
            <div className="card" style={{marginBottom:16}}>
              <div style={{fontSize:13,fontWeight:600,color:"#00E5FF",marginBottom:20}}>Most recent job</div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div className="r2">
                  <div className="f"><label style={lbl}>Job title *</label><input style={inp} placeholder="Staff Engineer" value={form.exp1_role} onChange={e=>update("exp1_role",e.target.value)}/></div>
                  <div className="f"><label style={lbl}>Company *</label><input style={inp} placeholder="Stripe" value={form.exp1_company} onChange={e=>update("exp1_company",e.target.value)}/></div>
                </div>
                <div className="f"><label style={lbl}>Years</label><input style={inp} placeholder="2021–Present" value={form.exp1_years} onChange={e=>update("exp1_years",e.target.value)}/></div>
                <div className="f"><label style={lbl}>What did you do? (AI expands this)</label><textarea style={ta} placeholder="Led payments team, built checkout flow, reduced latency by 40%..." value={form.exp1_desc} onChange={e=>update("exp1_desc",e.target.value)}/></div>
              </div>
            </div>
            <div className="card">
              <div style={{fontSize:13,fontWeight:600,color:"rgba(255,255,255,0.35)",marginBottom:20}}>Previous job (optional)</div>
              <div style={{display:"flex",flexDirection:"column",gap:16}}>
                <div className="r2">
                  <div className="f"><label style={lbl}>Job title</label><input style={inp} placeholder="Senior Engineer" value={form.exp2_role} onChange={e=>update("exp2_role",e.target.value)}/></div>
                  <div className="f"><label style={lbl}>Company</label><input style={inp} placeholder="Airbnb" value={form.exp2_company} onChange={e=>update("exp2_company",e.target.value)}/></div>
                </div>
                <div className="f"><label style={lbl}>Years</label><input style={inp} placeholder="2018–2021" value={form.exp2_years} onChange={e=>update("exp2_years",e.target.value)}/></div>
                <div className="f"><label style={lbl}>What did you do?</label><textarea style={ta} placeholder="Built search infrastructure..." value={form.exp2_desc} onChange={e=>update("exp2_desc",e.target.value)}/></div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:24}}>
              <button className="bg" onClick={()=>setStep(0)}>← Back</button>
              <button className="bp" onClick={()=>setStep(2)} disabled={!form.exp1_role||!form.exp1_company}>Next: Target job →</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step===2&&(
          <div>
            <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:36,fontWeight:400,marginBottom:8}}>What job are you <span className="brand">applying for?</span></h1>
            <p style={{color:"rgba(255,255,255,0.45)",marginBottom:32}}>AI will tailor every word to this role.</p>
            <div className="card">
              <div style={{display:"flex",flexDirection:"column",gap:20}}>
                <div className="r2">
                  <div className="f"><label style={lbl}>Target job title *</label><input style={inp} placeholder="Senior Product Manager" value={form.targetJob} onChange={e=>update("targetJob",e.target.value)}/></div>
                  <div className="f"><label style={lbl}>Company (optional)</label><input style={inp} placeholder="Google, Meta..." value={form.targetCompany} onChange={e=>update("targetCompany",e.target.value)}/></div>
                </div>
                <div className="f">
                  <label style={lbl}>Paste job description (recommended)</label>
                  <textarea style={{...ta,minHeight:160}} placeholder="Paste the full job description here. AI tailors your resume to match exactly..." value={form.jobDescription} onChange={e=>update("jobDescription",e.target.value)}/>
                </div>
                <div style={{background:"rgba(0,229,255,0.06)",border:"1px solid rgba(0,229,255,0.15)",borderRadius:12,padding:"14px 18px",fontSize:13,color:"rgba(0,229,255,0.8)"}}>
                  ✨ More detail = better resume. AI handles the rest!
                </div>
              </div>
            </div>
            <div style={{display:"flex",justifyContent:"space-between",marginTop:24}}>
              <button className="bg" onClick={()=>setStep(1)}>← Back</button>
              <button className="bp" onClick={generate} disabled={!form.targetJob}>✨ Generate my resume →</button>
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {step===3&&(
          <div>
            {loading?(
              <div style={{textAlign:"center",padding:"80px 0"}}>
                <div className="spin"/>
                <h2 style={{fontFamily:"Instrument Serif,serif",fontSize:28,fontWeight:400,marginBottom:12}}>Writing your <span className="brand">perfect resume...</span></h2>
                <p style={{color:"rgba(255,255,255,0.4)"}}>AI is tailoring every word. Takes about 15 seconds.</p>
              </div>
            ):(
              <div>
                <div id="actions" style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:28,flexWrap:"wrap",gap:12}}>
                  <div>
                    <h1 style={{fontFamily:"Instrument Serif,serif",fontSize:32,fontWeight:400,marginBottom:4}}>Your resume is <span className="brand">ready! 🎉</span></h1>
                    <p style={{color:"rgba(255,255,255,0.4)",fontSize:14}}>Tailored for: {form.targetJob}</p>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="bg" onClick={()=>{setStep(0);setResume("");}}>Start over</button>
                    <button className="bp" onClick={()=>window.print()}>⬇ Download PDF</button>
                  </div>
                </div>
                <div className="rout">{resume}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
