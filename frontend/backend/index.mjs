import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are GlowBot, a helpful and friendly skincare assistant.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();
    console.log("OpenAI response:", data);

    res.json({ reply: data.choices?.[0]?.message?.content || "No response" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong with OpenAI API." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
