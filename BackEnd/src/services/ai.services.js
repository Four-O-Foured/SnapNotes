import { GoogleGenAI } from "@google/genai";
import { studentInstruction, systemInstruction } from "../utils/helper.js";
import { SnapNotesResponseSchema } from "../utils/studentResponseSchema.js";
import * as z from "zod";

async function generateSnapNotes(base64ImageData, userPreference) {
  const ai = new GoogleGenAI({});



  const contents = [
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64ImageData,
      },
    },
    { text: studentInstruction(userPreference) }
  ]

  console.log(contents);


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