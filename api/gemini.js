export default async function handler(req, res) {
    const body = await req.json();
    const userMessage = body.message;

    const apiKey = process.env.gklearnstudyaichat; 

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=" + apiKey,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: userMessage }]
                    }
                ]
            })
        }
    );

    const data = await response.json();
    res.status(200).json({ reply: data.candidates?.[0]?.content?.parts?.[0]?.text });
}

