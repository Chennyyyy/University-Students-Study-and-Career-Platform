import { GoogleGenAI, Type } from "@google/genai";
import { CareerAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeCareerPath = async (
  skills: string,
  city: string,
  targetRole?: string
): Promise<CareerAnalysisResult> => {
  try {
    const prompt = `
      Act as a senior career counselor and data scientist for college students in China.
      The user is in ${city}.
      Their current skills/description: "${skills}".
      ${targetRole ? `They are interested in: "${targetRole}".` : ''}

      Perform a regression analysis simulation to predict their market value and identify technical gaps.
      
      Return a JSON object with:
      1. recommendedRole: The most suitable specific job title.
      2. salaryRange: Predicted monthly salary range in RMB (e.g., "8k-12k").
      3. gapAnalysis: An array of 5 key technical skills required for this role. For each, estimate the user's current level (0-100 based on their description, default to 30 if unknown) and the required level (usually 80-90 for employment).
      4. summary: A brief 2-sentence encouragement and analysis.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendedRole: { type: Type.STRING },
            salaryRange: { type: Type.STRING },
            gapAnalysis: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  skill: { type: Type.STRING },
                  currentLevel: { type: Type.NUMBER },
                  requiredLevel: { type: Type.NUMBER },
                  description: { type: Type.STRING },
                },
                required: ["skill", "currentLevel", "requiredLevel", "description"]
              }
            },
            summary: { type: Type.STRING },
          },
          required: ["recommendedRole", "salaryRange", "gapAnalysis", "summary"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as CareerAnalysisResult;
    }
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const chatWithLittleZhi = async (history: {role: string, parts: {text: string}[]}[], message: string) => {
  try {
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: "You are 'Little Zhi' (小智同学), a warm, encouraging, and knowledgeable AI assistant for college students. You help with career planning, academic questions, and emotional support. Keep answers concise and helpful.",
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Chat Error:", error);
    return "Sorry, Little Zhi is taking a nap. Please try again later.";
  }
};