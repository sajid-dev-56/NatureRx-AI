import Groq from "groq-sdk";
import { NextResponse } from "next/server";

// Initialize Groq API
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API key is not configured." }, { status: 500 });
    }

    const systemInstruction = `
      You are NatureRx AI, an expert in natural remedies and organic health.
      Always prioritize scientifically supported natural alternatives (herbs, plants).
      CRITICAL: If the user mentions emergency symptoms (chest pain, severe bleeding, breathing difficulty), 
      you MUST advise them to seek immediate medical help.
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: prompt }
      ],
      model: "llama-3.3-70b-versatile",
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json({ error: "Failed to process chat." }, { status: 500 });
  }
}
