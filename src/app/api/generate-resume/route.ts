import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const form = await req.json();

    const prompt = `You are an expert resume writer. Create a professional, ATS-optimized resume for the following person. Format it cleanly with clear sections. Use strong action verbs and quantified achievements where possible.

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

TARGET ROLE:
Job Title: ${form.targetJob}
${form.targetCompany ? `Company: ${form.targetCompany}` : ""}
${form.jobDescription ? `Job Description:\n${form.jobDescription}` : ""}

Write a complete, polished resume. Tailor the summary and bullet points to match the target role. Use 3-5 strong bullet points per job. Include: Header, Professional Summary, Experience, Skills, and Education sections. Make it look like it was written by a professional resume coach.`;

    const message = await client.messages.create({
      model: "claude-opus-4-5",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const resume = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json({ resume });
  } catch (error) {
    console.error("Resume generation error:", error);
    return NextResponse.json({ error: "Failed to generate resume" }, { status: 500 });
  }
}
