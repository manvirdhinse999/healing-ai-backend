export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { text } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: basePrompt(text) }],
      temperature: 0.9,
    });

    const response = completion.choices[0].message.content.trim();
    res.status(200).json({ question: response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI error" });
  }
}
