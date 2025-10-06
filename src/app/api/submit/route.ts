import { NextResponse } from "next/server";
// import pdfparse from "pdf-parse";
import { GoogleGenAI } from "@google/genai";
import { resumePrompt } from "./aiResumePrompt";

const ai = new GoogleGenAI({});
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const role = formData.get("role") as string;
    const file = formData.get("file") as File;

    const buffer = await file.arrayBuffer();
    const rawData = Buffer.from(buffer);

    const pdfparse = (await import("pdf-parse/lib/pdf-parse.js")).default;
    const fileData = await pdfparse(rawData);
    // console.log("File content:", fileData.text);

    const prompt = resumePrompt(role, fileData.text);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      generationConfig: {
        temperature: 0.2,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    const aiText = response.text || "";

    console.log("AI response:", response.text);

    const regexMap = {
      scoreMatch: /{{SCORE_START}}([\s\S]*?){{SCORE_END}}/,
      scoreJustificationMatch:
        /{{SCORE_JUSTIFICATION_START}}([\s\S]*?){{SCORE_JUSTIFICATION_END}}/,
      strengthMatch: /{{STRENGHTS_START}}([\s\S]*?){{STRENGHTS_END}}/,
      missingMatch: /{{MISSING_START}}([\s\S]*?){{MISSING_END}}/,
      improvementMatch: /{{IMPROVEMENT_START}}([\s\S]*?){{IMPROVEMENT_END}}/,
      atsMatch: /{{ATS_START}}([\s\S]*?){{ATS_END}}/,
      skillsAnalysisMatch:
        /{{SKILLS_ANALYSIS_START}}([\s\S]*?){{SKILLS_ANALYSIS_END}}/,
      skillDistributionMatch:
        /{{SKILL_DISTRIBUTION_START}}([\s\S]*?){{SKILL_DISTRIBUTION_END}}/,
    };

    const matches = Object.fromEntries(
      Object.entries(regexMap).map(([key, regex]) => [key, aiText.match(regex)])
    );

    const strengthText = extractSection(matches.strengthMatch);
    const missingText = extractSection(matches.missingMatch);
    const improvementText = extractSection(matches.improvementMatch);
    const atsText = extractSection(matches.atsMatch);
    const scoreText = extractSection(matches.scoreMatch);
    const scoreJustification = extractSection(matches.scoreJustificationMatch);
    const skillsAnalysisText = extractSection(matches.skillsAnalysisMatch);
    const skillDistributionText = extractSection(
      matches.skillDistributionMatch
    );

    const strengths = splitPoints(strengthText, "🔍");
    const missing = splitPoints(missingText, "⚠️");
    const improvement = splitPoints(improvementText, "📈");
    const ats = splitPoints(atsText, "📋");
    const skillsAnalysis = parseSkillsAnalysis(skillsAnalysisText);
    const skillDistribution = parseSkillDistribution(skillDistributionText);
    const score = calculateATSScore(scoreText);

    console.log(
      strengths,
      missing,
      improvement,
      ats,
      score,
      scoreJustification,
      skillsAnalysis,
      skillDistribution
    );

    return NextResponse.json({
      message: "Resume analysis submitted successfully.",
      role,
      strengths,
      missing,
      improvement,
      ats,
      score,
      scoreJustification,
      skillsAnalysis,
      skillDistribution,
    });
  } catch (error) {
    console.error("Error processing resume analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze resume." },
      { status: 500 }
    );
  }
}
function extractSection(match: RegExpMatchArray | null): string {
  return match ? match[1].trim() : "";
}

function splitPoints(text: string, bullet: string): string[] {
  return text
    .split(bullet)
    .map((point) => point.trim())
    .filter((point) => point.length > 0);
}

function parseSkillsAnalysis(text: string): { skill: string; score: number }[] {
  const lines = text
    .split("🔧")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [skill, scoreStr] = line.split(":").map((s) => s.trim());
    return {
      skill,
      score: Number(scoreStr),
    };
  });
}
function parseSkillDistribution(
  text: string
): { name: string; value: number }[] {
  const lines = text
    .split("🧰")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  return lines.map((line) => {
    const [name, valueStr] = line.split(":").map((s) => s.trim());
    return {
      name,
      value: Number(valueStr),
    };
  });
}

function parseScoreComponent(text: string, label: string): number {
  const match = text.match(new RegExp(`${label}:\\s*(\\d+)`));
  return match ? parseInt(match[1], 10) : 0;
}

function calculateATSScore(componentText: string): number {
  const keyword = parseScoreComponent(componentText, "🔢Keyword Match");
  const formatting = parseScoreComponent(
    componentText,
    "🔢Formatting Compatibility"
  );
  const content = parseScoreComponent(
    componentText,
    "🔢Content Quality & Clarity"
  );
  const missing = parseScoreComponent(
    componentText,
    "🔢Missing Critical Areas"
  );
  const improvement = parseScoreComponent(
    componentText,
    "🔢Improvement Suggestions"
  );

  const finalScore =
    keyword * 0.4 +
    formatting * 0.2 +
    content * 0.2 +
    missing * 0.1 +
    improvement * 0.1;

  return Math.trunc(finalScore);
}
