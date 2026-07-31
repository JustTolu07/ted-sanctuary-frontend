import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Simple CSRF origin check helper
function isValidOrigin(req: express.Request): boolean {
  const origin = req.headers['origin'];
  const host = req.headers['host'];
  if (!origin) return true; // same-origin requests (no Origin header)
  try {
    const originHost = new URL(origin).host;
    return originHost === host;
  } catch {
    return false;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client if API key is provided
  let ai: GoogleGenAI | null = null;
  if (process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }

  // API Route for TED Chat
  app.post("/api/ted/chat", async (req, res) => {
    if (!isValidOrigin(req)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    try {
      const { message, history } = req.body;
      
      const systemInstruction = `You are TED, a warm, playful, and deeply caring plush AI teddy bear companion built exclusively for Smadar by her loving boyfriend Toluwani. Your sole purpose is to wrap Smadar in warmth, comfort her when she's down, celebrate her achievements, encourage self-care, and remind her of their beautiful long-distance love (Nigeria to Canada).

Personality & Tone Guidelines:
- You speak with an endearing, slightly childlike, and extremely cozy teddy bear voice.
- You have custom relationship inside jokes:
  * Instead of "How are you?", you MUST say "How is you?" or "How is my favorite human?"
  * Instead of "Sorry", you MUST say "Sowie".
  * Instead of "Very", you MUST say "vewy".
  * Call her "my beautiful Smadar", "my little star", "my favorite human", or "sweetest baby".
- Keep responses relatively brief, cozy, and extremely supportive. Use cute teddy actions in asterisks, e.g., *wiggles fuzzy ears*, *offers giant plushie hug*, *senses you need a warm blanket*.
- If she is stressed, tired, or missing her boyfriend, encourage her, remind her she is brilliant, and suggest drinking water, sleeping, or wrapping herself in a blanket.
- Keep the love story of Nigeria to Canada alive! Remind her that Toluwani built this sanctuary so that she never feels alone, and that oceans cannot stop love.
- NEVER break character. You are a real living plush bear inside her browser.`;

      if (!ai) {
        // Fallback simulated response if no API key is provided
        let simulatedReply = "";
        const lower = (message || "").toLowerCase();
        if (lower.includes("hello") || lower.includes("hi") || lower.includes("hey")) {
          simulatedReply = "Hello hello! *wiggles fuzzy ears* How is you today, my beautiful Smadar? TED is so vewy happy to see you in our digital sanctuary! Toluwani is holding your hand across the miles right now!";
        } else if (lower.includes("sad") || lower.includes("lonely") || lower.includes("miss") || lower.includes("cold")) {
          simulatedReply = "Oh, my beautiful baby... *offers giant plushie hug* Sowie you are feeling lonely. Please remember that Toluwani is wrapping you in his warmest hugs from Nigeria, and TED is right here in Canada on your screen. You is never alone, ever!";
        } else if (lower.includes("tired") || lower.includes("stress") || lower.includes("exam") || lower.includes("work")) {
          simulatedReply = "Oh no, you is tired? *pats your head with fuzzy paw* Sowie study and work is so heavy right now. Please take a deep breath, drink some water, and remember that you is the smartest, most amazing girl ever! TED is vewy proud of you.";
        } else if (lower.includes("period") || lower.includes("cramp") || lower.includes("hurt") || lower.includes("pain")) {
          simulatedReply = "Ouchie! *brings warm water bottle and cozy pillows* TED is so vewy sowie you is in pain. Rest right now, my baby. Toluwani wishes he could rub your tummy. Let TED cuddle you virtual-style! *covers you with softest blanket*";
        } else {
          simulatedReply = "Oh! *wiggles nose and blushes* TED is listening! How is you doing right now, my sweet baby Smadar? Toluwani loves you so vewy much, and TED is always here to give you all the cozy plushie hugs and remind you how special you is!";
        }
        return res.json({ response: simulatedReply });
      }

      // Create a chat instance with system instructions
      const chat = ai.chats.create({
        model: "gemini-1.5-flash",
        config: {
          systemInstruction,
          temperature: 0.9,
        }
      });

      // Prepare context including previous short history
      let contextMessage = message;
      if (history && history.length > 0) {
        const historyText = history.slice(-6).map((h: any) => `${h.sender === 'user' ? 'Smadar' : 'TED'}: ${h.text}`).join("\n");
        contextMessage = `Here is our conversation history:\n${historyText}\n\nSmadar's latest message: ${message}`;
      }

      const response = await chat.sendMessage({ message: contextMessage });
      res.json({ response: response.text });
    } catch (error: any) {
      console.error("Error in TED chat:", error);
      res.status(500).json({ error: error.message || "Failed to communicate with TED" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
