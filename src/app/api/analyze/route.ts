import Groq from "groq-sdk";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || "" });

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "Groq API key is not configured." }, { status: 500 });
    }

    const prompt = `
      Analyze this image of a plant. Provide a JSON response ONLY with the following structure:
      {
        "name": "Name of the plant",
        "confidence": 95,
        "benefits": ["benefit 1", "benefit 2"],
        "precautions": ["precaution 1", "precaution 2"],
        "healthStatus": "Healthy" | "Diseased" | "Needs Attention",
        "diseaseDetails": "Details if diseased or needs attention, otherwise null"
      }
    `;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
    });

    let text = chatCompletion.choices[0]?.message?.content || "{}";
    
    // Parse the JSON from the markdown block that LLMs usually return
    text = text.replace(/```json\n?/, "").replace(/```\n?/, "");
    
    let jsonResult;
    try {
      jsonResult = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", text);
      throw new Error("Invalid JSON format");
    }

    return NextResponse.json(jsonResult);
  } catch (error) {
    console.error("Groq Vision API Error:", error);
    return NextResponse.json({ error: "Failed to analyze image." }, { status: 500 });
  }
}
