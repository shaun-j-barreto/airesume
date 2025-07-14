import { NextResponse } from "next/server";
import pdfparse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const role = formData.get("role");
    const file = formData.get("file") as File;

    const buffer = await file.arrayBuffer();
    const rawData = Buffer.from(buffer);
    const fileData = await pdfparse(rawData);
    console.log("File content:", fileData.text);

    const prompt = `You are a highly intelligent AI resume analysis assistant.

You will be given:
1. A **user’s resume** in plain text or extracted content from a PDF.
2. A **target job role** (e.g., Frontend Developer, Data Analyst).

Your task is to:
- Analyze the resume in relation to the given role.
- Identify strengths, weaknesses, and suggest improvements.
- Provide insights to improve alignment with the job role.

---

🔍 Resume Content:
${fileData.text}

🎯 Target Job Role:
${role}

---

🔎 Your output should be structured as follows:

1. ✅ **Resume Summary**  
Summarize the candidate's background, domain, years of experience, and major expertise.

2. 🎯 **Relevance to the Role**  
Evaluate how well the resume matches the target role. Highlight relevant skills, experience, and keywords found.

3. ⚠️ **Missing or Weak Areas**  
Mention skills, tools, or experiences that are expected for this role but are **missing or weak** in the resume.

4. 📈 **Suggestions for Improvement**  
Give actionable suggestions to enhance the resume: what to add, change, or remove to better match the target role.

5. 📋 **ATS Optimization Tips**  
Suggest improvements to make the resume more **Applicant Tracking System (ATS)** friendly (e.g., formatting, keywords, clarity).

6. 🌟 **Top 5 Keywords Found**  
List 5 key job-related keywords you found in the resume.

7. ❌ **Top 5 Missing Keywords**  
List 5 relevant job-specific keywords that are **missing**.

Respond in clear, bullet-pointed, concise format and give a score out of 100.

---

Only use the resume content provided. Do not assume anything extra.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    console.log("AI response:", response.text);

    return NextResponse.json({
      message: "Resume analysis submitted successfully.",
      role,
      fileName: file.name,
      fileSize: file.size,
    });
  } catch (error) {
    console.error("Error processing resume analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume." },
      { status: 500 }
    );
  }
}
