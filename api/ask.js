export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: "No question provided" });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // hoặc gpt-3.5-turbo nếu bạn muốn
        messages: [{ role: "user", content: question }]
      })
    });

    const data = await r.json();
    res.status(200).json({ answer: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

