export async function POST(request: Request) {
    const body = await request.json()
    const { message } = body;

    if (!message) {
        return new Response("No message provided", { status: 400 });
    }

    try {
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "user", content: message },
                ],
                max_tokens: 150,
                temperature: 0.7,
            }),
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const aiMessage = data.choices[0].message.content;
        return new Response(JSON.stringify(aiMessage), {
            status: 200,
        });
    } catch (error) {
        return new Response("Something went wrong with OpenAI", { status: 500 });
    }
}