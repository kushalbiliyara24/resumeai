import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ resume: "API key not configured. Please add GEMINI_API_KEY to Vercel environment variables." });
    }

    const prompt = `You are an expert resume writer. Create a professional, ATS-optimized resume for the following person. Format it cleanly with clear sections. Use strong action verbs and quantified achievements.

PERSON'S DETAILS:
Name: ${form.name}
Current Title: ${form.title}
Email: ${form.email} | Phone: ${form.phone} | Location: ${form.location}
Education: ${form.education}
Skills: ${form.skills}

WORK EXPERIENCE:
Job 1: ${form.exp1_role} at ${form.exp1_company} (${form.exp1_years})
Description: ${form.exp1_desc}

${form.exp2_role ? `Job 2: ${form.exp2_role} at ${form.exp2_company} (${form.exp2_years})
Description: ${form.exp2_desc}` : ""}

TARGET ROLE: ${form.targetJob}
${form.targetCompany ? `Company: ${form.targetCompany}` : ""}
${form.jobDescription ? `Job Description: ${form.jobDescription}` : ""}

Write a complete, polished resume with: Header, Professional Summary, Experience (3-5 bullet points each), Skills, and Education sections. Tailor everything to the target role.`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { maxOutputTokens: 2048, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      const err = await response.text();
      console.error("Gemini error:", err);
      return NextResponse.json({ resume: `API Error: ${response.status}. Please check your Gemini API key.` });
    }

    const data = await response.json();
    const resume = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!resume) {
      return NextResponse.json({ resume: "No response from AI. Please try again." });
    }

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json({ resume: "Connection error. Please try again in a moment." });
  }
}
