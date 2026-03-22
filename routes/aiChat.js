import express from "express";
import OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY 
});

// Generic Chat Route (existing)
router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Fixed model name
      messages: [
        { role: "system", content: "You are a helpful AI assistant for 'Capital Collateral', a premium pawnshop service." },
        { role: "user", content: message }
      ]
    });
     
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error("AI ERROR:", error);
    res.status(500).json({ error: "AI service is temporarily unavailable. Please check your API key." });
  }
});

// NEW: SmartVal AI Collateral Estimator Route
router.post("/estimate", async (req, res) => {
  try {
    const { category, condition, details } = req.body;

    if (!category || !details) {
      return res.status(400).json({ error: "Category and details are required for estimation." });
    }

    const prompt = `
      You are a professional Pawnshop Appraiser for 'Capital Collateral'. 
      Analyze the following item and provide a structured valuation report:
      
      ITEM CATEGORY: ${category}
      ITEM CONDITION: ${condition}
      DETAILS: ${details}
      
      Please provide:
      1. Estimated Market Value (in INR ₹)
      2. Suggested Loan Amount (usually 60-80% of market value)
      3. Collateral Grade (A, B, C, or D)
      4. Brief expert reasoning.
      
      Format the response as a JSON object with keys: marketValue, loanAmount, grade, reasoning.
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a professional pawnshop appraiser. Always respond in valid JSON format." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });
     
    const result = JSON.parse(completion.choices[0].message.content);
    res.json(result);
  } catch (error) {
    console.error("ESTIMATION ERROR:", error);
    res.status(500).json({ error: "Estimation failed. Please try again later." });
  }
});

export default router;