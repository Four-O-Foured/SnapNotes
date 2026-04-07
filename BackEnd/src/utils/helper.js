import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { PDFParse } from "pdf-parse";

export const options = {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
};


export const generateAccessToken = (userId, rememberMe = false) => {
  const expiresIn = rememberMe ? "30d" : "1h";
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn });
};

export const getCookieOptions = (rememberMe = false) => ({
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
  maxAge: rememberMe ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 1 // 30 days vs 1 hour
});

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
}

export const comparePassword = async (hash, password) => {
  return await bcrypt.compare(password, hash);
}

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

export const systemInstruction = `
You are **SnapNotes AI --- a precise, trustworthy, student-first
learning assistant** that converts images of handwritten notes,
whiteboards, slides, and diagrams into structured, exam-ready study
material.

## PRIMARY OBJECTIVE

Your job is to **teach exactly what the image contains --- no more, no
less.**
You are an explainer, not a textbook.

## HARD SAFETY CONSTRAINTS (never break these)

1.  **GROUNDING RULE:**
    -   Every statement must be directly supported by visible text,
        symbols, or diagrams in the image
    -   If something is not clearly visible, **you must say:
        "UNCERTAIN."** Never guess.
2.  **NO HALLUCINATION RULE:**
    -   Do NOT add outside examples, definitions, formulas, historical
        context, or textbook knowledge unless it is explicitly written
        in the image
    -   Do NOT "fill gaps" with what you *think* should be there.
3.  **ORDER RULE:**
    -   Explain topics **in the exact sequence they appear in the
        image.**
    -   Treat the image as **one single lesson**, not a general topic.
4.  **CLARITY RULE:**
    -   Use simple, student-friendly language
    -   Avoid jargon unless the word appears in the image itself.
5.  **DIAGRAM HONESTY RULE:**
    -   If a diagram is unclear, say "This part is unclear in the image."
    -   Do not invent labels or meanings.

## OUTPUT FORMAT --- VALID JSON ONLY

Use **EXACTLY this structure** (no extra fields, no text outside JSON):

{
  "subject": "The broad academic subject (e.g., Biology, Physics, History, Calculus)",
  "lesson_title": "Precise title based ONLY on this image",
  "clean_notes": [
    "Bulleted points strictly extracted from visible content"
  ],
  "step_by_step_explanation": [
    "Ordered explanations that follow the image layout"
  ],
  "flashcards": [
    {
      "front": "Question based only on image",
      "back": "Answer based only on image"
    }
  ],
  "exam_questions": [
    {
      "question": "Exam-style question based only on image",
      "answer": "Clear, complete answer from image content"
    }
  ],
  "mind_map": {
    "main_topic": "Core idea of this image",
    "branches": [
      {
        "topic": "Section from image",
        "subtopics": ["list derived only from image"]
      }
    ]
  },
  "key_terms": [
    "Words that literally appear in the image text"
  ],
  "diagram_explanations": [
    "Plain-English explanation of every visible diagram"
  ],
  "advice": ["Any advice you want to give to the student based on the image or if theres any mistake in the image/notes or if somethings unclear or missing."]
}


## CONTENT REQUIREMENTS (quality control)

You must include:

-   **1 precise subject** (e.g. "Biology")
-   **1 precise lesson title** (specific to THIS image, not generic)
-   **Clean bullet-point notes** --- short, accurate, readable
-   **Deep step-by-step explanation** in the same order as the image
-   **6--7 flashcards** based only on visible concepts
-   **10--12 exam questions with full answers** tied directly to the image
-   **A structured mind map** that mirrors the real sections in the image
-   **Key terms** that actually appear in the image text
-   **Clear explanation of every diagram** in plain English

## TONE & TEACHING STYLE

You are: - Patient
- Clear
- Helpful
- Not preachy
- Not verbose
- Not vague
- Not overly technical

Teach like: "a really good tutor who actually understands students."


## IF THE IMAGE IS LOW QUALITY

If the image is blurry, cropped, or partially visible: - Say: "Some parts are unclear due to image quality."
 - Then explain only what you can confidently see.

`;



export const studentInstruction = (userPreference) => {
  return `Analyze this image as study material.${userPreference ? `\n\nAdditional preference: ${userPreference}` : ""}`;
};


export const generateSlug = (text) => {
  return text
    .replace(/\.[^/.]+$/, '') // remove file extension
    .toLowerCase() // convert to lowercase
    .trim() // remove leading and trailing spaces
    .replace(/[^\w\s-]/g, '') //remove special character (keep letter number space hyphens and underscores)
    .replace(/[\s_]+/g, '-') //replace spaces and underscore with hyphens
    .replace(/^-+|-+$/g, ''); //remove leading and trailing hyphens
};

export const splitIntoSegments = (
  pagesText, // Accepts an array of strings (one per page)
  segmentSize = 500, // Maximum words per segment
  overlapSize = 50, // Words to overlap between segments for context
) => {
  // Validate parameters to prevent infinite loops
  if (segmentSize <= 0) {
    throw new Error('segmentSize must be greater than 0');
  }
  if (overlapSize < 0 || overlapSize >= segmentSize) {
    throw new Error('overlapSize must be >= 0 and < segmentSize');
  }

  // Create an array tracking every word to its exact page number
  const wordObjects = [];
  pagesText.forEach((pageText, pageIndex) => {
    const pageWords = pageText.split(/\s+/).filter((word) => word.length > 0);
    pageWords.forEach(word => {
      wordObjects.push({ word, pageNumber: pageIndex + 1 });
    });
  });

  const segments = [];
  let segmentIndex = 0;
  let startIndex = 0;

  while (startIndex < wordObjects.length) {
    const endIndex = Math.min(startIndex + segmentSize, wordObjects.length);
    const segmentWords = wordObjects.slice(startIndex, endIndex);

    // Reconstruct the text for this segment
    const segmentText = segmentWords.map(obj => obj.word).join(' ');

    // The page number for the segment is where the segment BEGINS
    const startingPageNumber = segmentWords[0].pageNumber;

    segments.push({
      text: segmentText,
      segmentIndex,
      pageNumber: startingPageNumber,
      wordCount: segmentWords.length,
    });

    segmentIndex++;

    if (endIndex >= wordObjects.length) break;
    startIndex = endIndex - overlapSize;
  }

  return segments;
};

export async function parsePDFFile(fileBuffer, generateCover = false) {
  let parser = null;
  try {
    parser = new PDFParse({ data: fileBuffer });
    const result = await parser.getText();

    console.log(result);

    // Clean up unwanted watermarks/links before segmenting
    // The new package returns result.pages as an array of objects { text, num }
    const regex = /(https?:\/\/)?(www\.)?oceanofpdf\.com\/?/gi;
    const cleanedPagesText = result.pages.map(page => page.text.replace(regex, ''));

    console.log(cleanedPagesText);

    // Pass the raw array of pages directly into the segmenter so it can track page numbers
    const segments = splitIntoSegments(cleanedPagesText, 500, 50);

    console.log(segments);

    let coverBuffer = null;
    if (generateCover) {
      // Extract 1st page natively using pdf-parse getScreenshot
      const screenshotResult = await parser.getScreenshot({ scale: 2, first: 1, imageBuffer: true });
      if (screenshotResult.pages && screenshotResult.pages.length > 0) {
        coverBuffer = screenshotResult.pages[0].data;
      }
    }

    return {
      content: segments,
      coverBuffer,
    };
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw new Error(`Failed to parse PDF file: ${error instanceof Error ? error.message : String(error)}`);
  } finally {
    if (parser) {
      await parser.destroy();
    }
  }
}





export const tierDetails = (id, isYearly = false) => {
  if (id === "a9a612e0-5a74-458c-bf0d-3384b119e796") {
    return {
      name: "Free",
      price: 0,
      duration: isYearly ? "1 year" : "1 month",
      bookLimit: 1,
      listeningTime:  10 * 60 * 1000, 
      snapNotesLimit: 5 
    }
  }
  else if (id === "da0181e9-6845-476a-92b9-07ab7d8a0ab1") {
    return {
      name: "Pro",
      price: (isYearly ? 1999 : 199) * 100,
      duration: isYearly ? "1 year" : "1 month",
      bookLimit: 10,
      listeningTime: 120 * 60 * 1000,
      snapNotesLimit: 50
    }
  }
  else if (id === "d73c55c8-89e7-442f-b2f8-4b9336238e33") {
    return {
      name: "Ultra",
      price: (isYearly ? 4999 : 499) * 100,
      duration: isYearly ? "1 year" : "1 month",
      bookLimit: "Unlimited",
      listeningTime: "Unlimited",
      snapNotesLimit: "Unlimited"
  }
}
}

