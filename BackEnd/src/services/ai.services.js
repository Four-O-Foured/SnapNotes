import { GoogleGenAI } from "@google/genai";
import { studentInstruction, systemInstruction } from "../utils/helper.js";
import { SnapNotesResponseSchema } from "../utils/studentResponseSchema.js";
import * as z from "zod";

async function generateSnapNotes(base64ImageArray, userPreference) {
  const ai = new GoogleGenAI({});

  const imageParts = base64ImageArray.map(img => ({
    inlineData: {
      mimeType: img.mimeType,
      data: img.data,
    },
  }));

  const contents = [
    ...imageParts,
    { text: studentInstruction(userPreference) }
  ]

  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
      responseMimeType: "application/json",
      responseJsonSchema: z.toJSONSchema(SnapNotesResponseSchema)
    }
  });

  const snapNotes = SnapNotesResponseSchema.parse(JSON.parse(result.text))

  return snapNotes;
}

export default generateSnapNotes;