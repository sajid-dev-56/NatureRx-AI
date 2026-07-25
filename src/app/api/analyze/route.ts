import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { imageBase64 } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key is not configured." }, { status: 500 });
    }

    // Using an available experimental model for this API key
    const model = genAI.getGenerativeModel({ model: "gemini-3.1-flash-tts-preview" });

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

    const imageParts = [
      {
        inlineData: {
          data: imageBase64.split(",")[1], // Remove the data:image/jpeg;base64, prefix
          mimeType: "image/jpeg",
        },
      },
    ];

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    
    // Parse the JSON from the markdown block that Gemini usually returns
    let text = response.text();
    text = text.replace(/```json\n?/, "").replace(/```\n?/, "");
    
    const jsonResult = JSON.parse(text);

    return NextResponse.json(jsonResult);
  } catch (error) {
    console.error("Gemini Vision API Error:", error);
    return NextResponse.json({ error: "Failed to analyze image." }, { status: 500 });
  }
}
