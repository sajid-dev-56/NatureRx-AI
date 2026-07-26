import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    // Using standard gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const systemInstruction = `
      You are NatureRx AI, an expert in natural remedies and organic health.
      Always prioritize scientifically supported natural alternatives (herbs, plants).
      CRITICAL: If the user mentions emergency symptoms (chest pain, severe bleeding, breathing difficulty), 
      you MUST advise them to seek immediate medical help.
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemInstruction}\n\nUser: ${prompt}` }] }],
    });

    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process chat." }, { status: 500 });
  }
}
