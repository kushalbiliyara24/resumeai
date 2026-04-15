"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #0A0A0F; }
        .grain {
          position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .orb { position: absolute; border-radius: 50%; filter: blur(90px); pointer-events: none; }
        .brand-text {
          background: linear-gradient(135deg, #00E5FF 0%, #A78BFA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .conx-sub {
          font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase;
          background: linear-gradient(135deg, #A78BFA, #7B5EA7);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 68px;
          background: rgba(10,10,15,0.88); backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .logo-block { display: flex; flex-direction: column; gap: 2px; line-height: 1; cursor: pointer; }
        .logo-name { font-family: 'Instrument Serif', serif; font-size: 23px; }
        .nav-links { display: flex; gap: 32px; }
        .nav-links a { color: rgba(255,255,255,0.5); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-links a:hover { color: white; }
        .btn-p {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #00E5FF, #7B5EA7);
          color: white; font-weight: 600; font-size: 14px;
          padding: 11px 24px; border-radius: 100px; border: none; cursor: pointer;
          text-decoration: none; transition: all 0.2s;
          box-shadow: 0 0 32px rgba(0,229,255,0.18);
        }
        .btn-p:hover { transform: translateY(-1px); box-shadow: 0 0 52px rgba(0,229,255,0.32); }
        .btn-g {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; color: rgba(255,255,255,0.6); font-size: 14px; font-weight: 500;
          padding: 11px 24px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.12);
          cursor: pointer; text-decoration: none; transition: all 0.2s;
        }
        .btn-g:hover { background: rgba(255,255,255,0.05); color: white; }
        .live-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,229,255,0.06); border: 1px solid rgba(0,229,255,0.16);
          color: #00E5FF; font-size: 12px; font-weight: 500; letter-spacing: 0.04em;
          padding: 6px 16px; border-radius: 100px; margin-bottom: 32px;
        }
        .live-dot { width: 6px; height: 6px; border-radius: 50%; background: #00E5FF; animation: blink 2s infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }
        .hero-title {
          font-family: 'Instrument Serif', serif;
          font-size: clamp(44px, 6.5vw, 82px);
          line-height: 1.04; letter-spacing: -0.03em; font-weight: 400;
        }
        .card {
          background: rgba(255,255,255,0.025); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px; padding: 28px; transition: border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .card:hover { border-color: rgba(0,229,255,0.2); transform: translateY(-3px); }
        .card::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, rgba(0,229,255,0.04), transparent 60%);
          opacity:0; transition:opacity 0.3s;
        }
        .card:hover::before { opacity:1; }
        .icon-box {
          width:48px; height:48px; border-radius:12px; margin-bottom:18px;
          background:rgba(0,229,255,0.08); border:1px solid rgba(0,229,255,0.12);
          display:flex; align-items:center; justify-content:center; font-size:22px;
        }
        .stat-num {
          font-family:'Instrument Serif',serif; font-size:50px; line-height:1;
          background:linear-gradient(135deg,#00E5FF,#A78BFA);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        .price-card {
          background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.08);
          border-radius:24px; padding:36px; flex:1; min-width:260px;
        }
        .price-card.hot {
          background:linear-gradient(160deg,rgba(0,229,255,0.07),rgba(123,94,167,0.06));
          border-color:rgba(0,229,255,0.25); position:relative;
        }
        .pop-tag {
          position:absolute; top:-13px; left:50%; transform:translateX(-50%);
          background:linear-gradient(135deg,#00E5FF,#7B5EA7);
          color:white; font-size:10px; font-weight:700; letter-spacing:0.1em;
          text-transform:uppercase; padding:4px 16px; border-radius:100px; white-space:nowrap;
        }
        .t-card {
          background:rgba(255,255,255,0.025); border:1px solid rgba(255,255,255,0.07);
          border-radius:20px; padding:28px;
        }
        .stars { color:#FFD264; letter-spacing:2px; font-size:13px; }
        .avatar {
          width:40px; height:40px; border-radius:50%; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          font-weight:700; color:white; font-size:13px;
        }
        .resume-mock {
          background:white; color:#111; border-radius:14px; padding:26px;
          box-shadow:0 48px 96px rgba(0,0,0,0.65);
          transform:perspective(900px) rotateY(-8deg) rotateX(2deg);
          width:300px; flex-shrink:0; font-family:'DM Sans',sans-serif; position:relative;
        }
        .section { padding:96px 48px; max-width:1200px; margin:0 auto; }
        .sec-tag { font-size:11px; font-weight:600; letter-spacing:0.12em; text-transform:uppercase; color:#00E5FF; margin-bottom:14px; }
        .sec-h { font-family:'Instrument Serif',serif; font-size:clamp(32px,3.5vw,48px); font-weight:400; line-height:1.15; }
        .g3 { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
        .flink { color:rgba(255,255,255,0.35); font-size:13px; text-decoration:none; transition:color 0.2s; }
        .flink:hover { color:rgba(255,255,255,0.7); }
        @media(max-width:768px){
          .nav{padding:0 20px;} .nav-links{display:none;}
          .section{padding:60px 20px;} .g3{grid-template-columns:1fr;}
          .hero-title{font-size:38px;} .resume-mock{display:none;}
        }
      `}</style>

      <div className="grain" />

      {/* NAV */}
      <nav className="nav">
        <div className="logo-block" onClick={() => router.push("/")}>
          <div className="logo-name">Resume<span className="brand-text">X</span></div>
          <div className="conx-sub">powered by ConXbyte</div>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#reviews">Reviews</a>
        </div>
        <div style={{display:'flex',gap:10,alignItems:'center'}}>
          <button onClick={() => router.push("/login")} className="btn-g">Log in</button>
          <button onClick={() => router.push("/builder")} className="btn-p">Start free →</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{position:'relative',paddingTop:160,paddingBottom:100,overflow:'hidden'}}>
        <div className="orb" style={{width:700,height:700,background:'rgba(0,229,255,0.08)',top:-300,left:'38%',transform:'translateX(-50%)'}}/>
        <div className="orb" style={{width:400,height:400,background:'rgba(123,94,167,0.1)',bottom:-100,right:-100}}/>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 48px',position:'relative',zIndex:1}}>
          <div style={{display:'flex',alignItems:'center',gap:64}}>
            <div style={{flex:1}}>
              <div className="live-badge">
                <span className="live-dot"/>
                AI-powered · Built for the US job market
              </div>
              <h1 className="hero-title">
                Your dream job<br/>starts with a<br/><span className="brand-text">killer resume.</span>
              </h1>
              <p style={{fontSize:17,color:'rgba(255,255,255,0.5)',lineHeight:1.75,marginTop:24,marginBottom:40,maxWidth:460}}>
                ResumeX uses AI to write your resume, cover letter, and LinkedIn bio in under 2 minutes — perfectly tailored to every job you apply for.
              </p>
              <div style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:48}}>
                <button onClick={() => router.push("/builder")} className="btn-p" style={{fontSize:15,padding:'13px 28px'}}>
                  Build my resume — free →
                </button>
                <a href="#how-it-works" className="btn-g" style={{fontSize:15,padding:'13px 28px'}}>
                  See how it works
                </a>
              </div>
              <div style={{display:'flex',alignItems:'center',gap:20}}>
                <div style={{display:'flex'}}>
                  {['S','M','J','A','R'].map((l,i)=>(
                    <div key={i} style={{width:32,height:32,borderRadius:'50%',background:`hsl(${190+i*25},70%,55%)`,border:'2px solid #0A0A0F',marginLeft:i>0?-8:0,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:700,color:'#0A0A0F'}}>{l}</div>
                  ))}
                </div>
                <div>
                  <div className="stars">★★★★★</div>
                  <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginTop:2}}>4.9/5 · 2,400+ reviews</div>
                </div>
              </div>
            </div>

            {/* Resume mock */}
            <div style={{flexShrink:0,position:'relative'}}>
              <div style={{position:'absolute',inset:-40,background:'radial-gradient(ellipse,rgba(0,229,255,0.1),transparent 70%)',filter:'blur(20px)'}}/>
              <div className="resume-mock">
                <div style={{fontWeight:700,fontSize:17,marginBottom:2}}>Alex Johnson</div>
                <div style={{fontSize:11,color:'#777',marginBottom:12}}>Senior Software Engineer · San Francisco, CA</div>
                <div style={{height:1,background:'#eee',marginBottom:12}}/>
                <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>Summary</div>
                <div style={{fontSize:11,color:'#555',lineHeight:1.65,marginBottom:14}}>Results-driven engineer with 8+ years building scalable systems at top-tier companies.</div>
                <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:8}}>Experience</div>
                {[{r:'Staff Engineer',c:'Stripe',y:'2021–Now'},{r:'Senior Engineer',c:'Airbnb',y:'2018–2021'}].map((e,i)=>(
                  <div key={i} style={{marginBottom:9}}>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                      <div style={{fontSize:12,fontWeight:600}}>{e.r}</div>
                      <div style={{fontSize:10,color:'#999'}}>{e.y}</div>
                    </div>
                    <div style={{fontSize:11,color:'#777'}}>{e.c}</div>
                  </div>
                ))}
                <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:6}}>Skills</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:4}}>
                  {['React','Node.js','AWS','TypeScript'].map(s=>(
                    <span key={s} style={{fontSize:10,background:'#f3f4f6',color:'#444',padding:'2px 8px',borderRadius:4}}>{s}</span>
                  ))}
                </div>
                <div style={{position:'absolute',top:-14,right:-14,background:'linear-gradient(135deg,#00E5FF,#7B5EA7)',color:'white',fontSize:10,fontWeight:700,padding:'5px 12px',borderRadius:100,boxShadow:'0 4px 24px rgba(0,229,255,0.3)',whiteSpace:'nowrap'}}>✨ Written by ResumeX AI</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div style={{borderTop:'1px solid rgba(255,255,255,0.06)',borderBottom:'1px solid rgba(255,255,255,0.06)',padding:'44px 48px'}}>
        <div style={{maxWidth:1000,margin:'0 auto',display:'flex',justifyContent:'space-around',flexWrap:'wrap',gap:32}}>
          {[{n:'30M+',l:'US job seekers/year'},{n:'2 min',l:'Average build time'},{n:'3×',l:'More interview callbacks'},{n:'10K+',l:'Resumes built this month'}].map((s,i)=>(
            <div key={i} style={{textAlign:'center'}}>
              <div className="stat-num">{s.n}</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,0.4)',marginTop:6}}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section className="section" id="how-it-works">
        <div style={{textAlign:'center',marginBottom:60}}>
          <div className="sec-tag">How it works</div>
          <h2 className="sec-h">From blank page to hired<br/><span className="brand-text">in 3 steps</span></h2>
        </div>
        <div className="g3">
          {[
            {n:'01',icon:'📋',t:'Tell us about yourself',d:'Enter your job title, experience, and the role you want. Takes under 2 minutes.'},
            {n:'02',icon:'✨',t:'AI writes everything',d:'ResumeX AI crafts your resume, cover letter, and LinkedIn summary — tailored to your job.'},
            {n:'03',icon:'🚀',t:'Apply and get hired',d:'Download a pixel-perfect PDF and start applying. Track applications in one place.'},
          ].map((s,i)=>(
            <div key={i} className="card" style={{textAlign:'center'}}>
              <div style={{fontSize:11,fontWeight:700,letterSpacing:'0.15em',color:'rgba(0,229,255,0.4)',marginBottom:14}}>{s.n}</div>
              <div style={{fontSize:40,marginBottom:16}}>{s.icon}</div>
              <h3 style={{fontSize:17,fontWeight:600,marginBottom:10}}>{s.t}</h3>
              <p style={{fontSize:14,color:'rgba(255,255,255,0.45)',lineHeight:1.75}}>{s.d}</p>
            </div>
          ))}
        </div>
        <div style={{textAlign:'center',marginTop:40}}>
          <button onClick={() => router.push("/builder")} className="btn-p" style={{fontSize:15,padding:'13px 32px'}}>
            Try it now — it&apos;s free →
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="section" id="features" style={{paddingTop:0}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div className="sec-tag">Features</div>
          <h2 className="sec-h">Everything you need<br/><span className="brand-text">to land the job</span></h2>
        </div>
        <div className="g3">
          {[
            {icon:'🤖',t:'AI Resume Builder',d:'Generates a complete, ATS-optimized resume from your experience in seconds.',link:'/builder'},
            {icon:'✉️',t:'Cover Letter Writer',d:'Paste a job description → get a perfectly tailored cover letter instantly.',link:'/cover-letter'},
            {icon:'🎯',t:'ATS Score Checker',d:'See how well your resume matches a job posting before you apply.',link:'/ats-checker'},
            {icon:'💼',t:'LinkedIn Optimizer',d:'Rewrite your headline and summary to attract 3× more recruiter views.',link:'/linkedin'},
            {icon:'🎤',t:'Interview Prep',d:'AI-generated interview questions and model answers based on your resume.',link:'/interview-prep'},
            {icon:'📄',t:'8 Pro Templates',d:'Beautiful, ATS-friendly designs — Modern, Executive, Creative, Minimal and more.',link:'/builder'},
          ].map((f,i)=>(
            <div key={i} className="card" style={{cursor:'pointer'}} onClick={() => router.push(f.link)}>
              <div className="icon-box">{f.icon}</div>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:10}}>{f.t}</h3>
              <p style={{fontSize:14,color:'rgba(255,255,255,0.45)',lineHeight:1.75}}>{f.d}</p>
              <div style={{fontSize:13,color:'#00E5FF',marginTop:12}}>Try it free →</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section" id="reviews" style={{paddingTop:0}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div className="sec-tag">Testimonials</div>
          <h2 className="sec-h">Real people,<br/><span className="brand-text">real results</span></h2>
        </div>
        <div className="g3">
          {[
            {name:'Sarah K.',role:'Landed at Google',init:'SK',color:'#00B4D8',text:"I applied to 40 jobs with my old resume — zero callbacks. Used ResumeX, applied to 10, got 4 interviews. Now I'm at Google."},
            {name:'Marcus T.',role:'$180k offer in 3 weeks',init:'MT',color:'#7B5EA7',text:"Was laid off in January and panicking. ResumeX helped me build a killer resume in 15 minutes. Got my dream offer in 3 weeks."},
            {name:'Priya M.',role:'Career switcher → hired',init:'PM',color:'#00C896',text:"Switching from teaching to UX felt impossible. ResumeX reframed my experience perfectly. Hired at a top design agency!"},
          ].map((t,i)=>(
            <div key={i} className="t-card">
              <div className="stars" style={{marginBottom:14}}>★★★★★</div>
              <p style={{fontSize:14,color:'rgba(255,255,255,0.65)',lineHeight:1.8,marginBottom:20}}>"{t.text}"</p>
              <div style={{display:'flex',alignItems:'center',gap:12}}>
                <div className="avatar" style={{background:t.color}}>{t.init}</div>
                <div>
                  <div style={{fontSize:14,fontWeight:600}}>{t.name}</div>
                  <div style={{fontSize:12,color:'#00E5FF'}}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="section" id="pricing" style={{paddingTop:0}}>
        <div style={{textAlign:'center',marginBottom:60}}>
          <div className="sec-tag">Pricing</div>
          <h2 className="sec-h">Simple, honest pricing.<br/><span className="brand-text">Start free today.</span></h2>
        </div>
        <div style={{display:'flex',gap:20,maxWidth:820,margin:'0 auto',flexWrap:'wrap'}}>
          <div className="price-card">
            <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:8}}>Free</div>
            <div style={{fontSize:44,fontWeight:700,lineHeight:1,marginBottom:4}}>$0</div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.3)',marginBottom:28}}>Forever free, no card needed</div>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:32}}>
              {['2 AI resumes / month','3 resume templates','PDF export','2 cover letters / month'].map((f,i)=>(
                <div key={i} style={{display:'flex',gap:10,fontSize:14,color:'rgba(255,255,255,0.55)'}}>
                  <span style={{color:'#00E5FF'}}>✓</span>{f}
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/builder")} className="btn-g" style={{width:'100%',justifyContent:'center'}}>
              Get started free
            </button>
          </div>

          <div className="price-card hot">
            <div className="pop-tag">MOST POPULAR</div>
            <div style={{fontSize:12,color:'rgba(255,255,255,0.4)',marginBottom:8}}>Pro</div>
            <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:4}}>
              <div style={{fontSize:44,fontWeight:700,lineHeight:1}}>$14</div>
              <div style={{fontSize:16,color:'rgba(255,255,255,0.4)'}}>.99/mo</div>
            </div>
            <div style={{fontSize:13,color:'rgba(255,255,255,0.3)',marginBottom:28}}>7-day free trial · Cancel anytime</div>
            <div style={{display:'flex',flexDirection:'column',gap:12,marginBottom:32}}>
              {['Unlimited AI resumes','All 8 pro templates','ATS score checker','Unlimited cover letters','LinkedIn optimizer','Interview Q&A prep','Priority support'].map((f,i)=>(
                <div key={i} style={{display:'flex',gap:10,fontSize:14,color:'rgba(255,255,255,0.8)'}}>
                  <span style={{color:'#00E5FF'}}>✓</span>{f}
                </div>
              ))}
            </div>
            <button onClick={() => router.push("/builder")} className="btn-p" style={{width:'100%',justifyContent:'center',fontSize:15}}>
              Start 7-day free trial →
            </button>
          </div>
        </div>
        <p style={{textAlign:'center',fontSize:13,color:'rgba(255,255,255,0.25)',marginTop:24}}>🔒 Secure payments · No hidden fees · Cancel anytime</p>
      </section>

      {/* CTA */}
      <section style={{textAlign:'center',padding:'100px 48px',position:'relative',overflow:'hidden'}}>
        <div className="orb" style={{width:600,height:600,background:'rgba(0,229,255,0.07)',top:'50%',left:'50%',transform:'translate(-50%,-50%)'}}/>
        <div style={{position:'relative',zIndex:1}}>
          <div className="sec-tag" style={{marginBottom:18}}>Get started</div>
          <h2 style={{fontFamily:'Instrument Serif,serif',fontSize:'clamp(36px,5vw,58px)',fontWeight:400,lineHeight:1.1,marginBottom:20}}>
            Your next job is one<br/><span className="brand-text">great resume away.</span>
          </h2>
          <p style={{fontSize:16,color:'rgba(255,255,255,0.4)',marginBottom:40}}>
            Join 10,000+ job seekers using ResumeX to land their dream roles.
          </p>
          <button onClick={() => router.push("/builder")} className="btn-p" style={{fontSize:16,padding:'15px 36px'}}>
            Build my resume for free →
          </button>
          <p style={{fontSize:12,color:'rgba(255,255,255,0.28)',marginTop:16}}>No credit card required · Ready in 2 minutes</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:'1px solid rgba(255,255,255,0.06)',padding:'36px 48px'}}>
        <div style={{maxWidth:1200,margin:'0 auto',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:20}}>
          <div>
            <div style={{fontFamily:'Instrument Serif,serif',fontSize:20}}>Resume<span className="brand-text">X</span></div>
            <div className="conx-sub" style={{marginTop:3}}>powered by ConXbyte</div>
          </div>
          <div style={{display:'flex',gap:24,flexWrap:'wrap'}}>
            {['Privacy Policy','Terms of Service','Contact Us','Blog'].map(l=>(
              <a key={l} href="#" className="flink">{l}</a>
            ))}
          </div>
          <div style={{fontSize:12,color:'rgba(255,255,255,0.25)'}}>© 2025 ConXbyte. All rights reserved.</div>
        </div>
      </footer>
    </main>
  );
}
