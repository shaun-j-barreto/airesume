import { NextResponse } from "next/server";
import pdfparse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const role = formData.get("role") as string;
    const file = formData.get("file") as File;

    const buffer = await file.arrayBuffer();
    const rawData = Buffer.from(buffer);
    const fileData = await pdfparse(rawData);
    console.log("File content:", fileData.text);

    const prompt = resumePrompt(role, fileData.text);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("AI response:", response.text);

    return NextResponse.json({
      message: "Resume analysis submitted successfully.",
      role,
      fileContent: response.text,
    });
  } catch (error) {
    console.error("Error processing resume analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume." },
      { status: 500 }
    );
  }
}

function resumePrompt(role: string, resume: string) {
  return `You are a highly intelligent Expert ATS Analyzer.

You will be given:
1. A **user’s resume** in plain text or extracted content from a PDF.
2. A **target job role** (e.g., Frontend Developer, Data Analyst).

Your task is to:
- Analyze the resume in relation to the given role.
- Identify strengths, weaknesses, and suggest improvements.
- Provide insights to improve alignment with the job role.

---
Here is the resume role and content:

🔍 Resume Content:
${resume}

🎯 Target Job Role:
${role}

---

This template provides a standardized, ATS-focused evaluation of a resume, ensuring consistent scoring and actionable feedback. The score is calculated using a weighted formula to minimize variability.

1. 📊 ATS Compatibility Score
Score: [X/100]
Scoring Methodology:
Keyword Match (50%): Percentage of job-specific keywords found (exact matches, synonyms, and related terms).
Formatting Compatibility (30%): Adherence to ATS-readable formatting (e.g., standard fonts, no tables/images, clear headings).
Content Strength (20%): Presence of action verbs, quantifiable achievements, and complete sections (e.g., skills, experience).

Formula:
Total Score = (Keyword Match % × 0.5) + (Formatting Compatibility % × 0.3) + (Content Strength % × 0.2)

Consistency Note: The same resume will yield the same score unless the job description or analyzer settings change.

2. 🔍 Key Strengths
List 3–5 strengths of the resume (e.g., strong keyword alignment, clear formatting, or quantifiable achievements).

Example: (give the points directly as bullet points instead having a subheading)
Matches 80% of job-specific keywords, including "[skill 1]" and "[skill 2]."
Uses ATS-friendly fonts (e.g., Arial) and clear section headings.
Includes measurable achievements, like "[specific accomplishment]."

3. ⚠️ Missing or Weak Areas
List 3–5 skills, tools, or experiences expected for the role but missing or underdeveloped in the resume.
Example: (this are just examples, does'nt necessarily have to be used, give points that are relevant to the resume. also give the points directly as bullet poins instead having a subheading)
Lacks mention of "[specific skill/tool]" listed in the job description.
Limited use of quantifiable metrics in work experience.
Missing certifications relevant to the role (e.g., "[certification name]")."

4. 📈 Suggestions for Improvement
Provide 3–5 actionable recommendations to enhance the resume’s alignment with the job description and ATS compatibility and how to increase the current ATS Compatibility Score.
Example:  (this are just examples, does'nt necessarily have to be used, give points that are relevant to the resume. also give the points directly as bullet points instead having a subheading)
Add specific keywords like "[keyword]" to the skills or experience sections to improve the current ats score.
Replace tables with bullet points to improve ATS parsing.
Include quantifiable results, e.g., “increased [metric] by [X%].”
Add a dedicated “Certifications” section for [certification name].

5. 📋 ATS Optimization Tips
Offer 3–5 specific tips to make the resume more ATS-friendly.
Example:  (this are just examples, does'nt necessarily have to be used, give points that are relevant to the resume.  also give the points directly as bullet points instead having a subheading)
Use standard section headings like “Work Experience” or “Skills.”
Include both acronyms and full terms, e.g., “Certified Public Accountant (CPA).”
Save the resume as a PDF or DOCX file without headers/footers.
Avoid graphics, logos, or complex formatting that may confuse ATS parsers.

---
🔎 Your output should be structured as follows:
{{SCORE_START}}
Score: x (give the score directly as a number. dont use any subheading or text before the score nor write it as "x/100" or "x out of 100" or anything like that, just give the score as a number)
{{SCORE_END}}

🔍 Key Strengths
{{STRENGHTS_START}}
(all key strengths will go here)
{{STRENGHTS_END}}

⚠️ Missing or Weak Areas
{{MISSING_START}}
(all missing or weak areas will go here)
{{MISSING_END}}

📈 Improvement Suggestions
{{IMPROVEMENT_START}}
(all suggestions for improvement will go here)
{{IMPROVEMENT_END}}

📋 ATS Optimization Tips
{{ATS_START}}
(all ATS optimization tips will go here)
{{ATS_END}}
---
Only use the resume content provided. Do not assume anything extra.
`;
}
