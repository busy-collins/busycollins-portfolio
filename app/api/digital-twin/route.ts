import { NextResponse } from "next/server";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

const careerContext = `
Collins Chibuike is a Senior Software Engineer based in Nigeria.
Current role: Senior Software Engineer at Deimos, April 2022 to present.
At Deimos, he led software engineering teams, delivered software solutions that increased customer satisfaction,
mentored junior engineers for over 20% productivity improvement, and coordinated cross-functional teams to reduce
development time by 30%.

Technical strengths include C#, SQL, HTML, JavaScript, software design, SDLC, software architecture, design patterns,
database design, Azure Functions, Azure Kubernetes Service, Azure Kusto, Azure Cosmos DB, Azure Data Lake, Microsoft
Azure, product development, problem solving, collaborative problem solving, requirements analysis, and databases.

Previous experience:
- Venture Garden Group, Senior Software Engineer, June 2021 to July 2022. Built and maintained RESTful APIs for
  mobile applications serving over 1 million daily active users. Improved delivery with CI/CD pipelines. Helped
  implement a CRS for Nigerian airline data reconciliation using MySQL, Octopus Deploy for Jira, and Jenkins. Built
  a distribution API that lets banks, fintechs, and consumer apps embed flight and transport reservations.
- Jane.com, Senior Software Engineer, March 2020 to January 2021, United States.
- Venture Garden Group, Software Engineer, January 2017 to June 2019. Helped build a real-time analytics dashboard
  using React and D3.js, increased automated test coverage from 60% to 90%, migrated microservices from AWS to Azure,
  converted legacy ASP.NET WebForms applications to .NET Core 6 microservices, and adopted automation to optimize
  processes.

Education: University of Benin, Bachelor's degree in Biology/Biological Sciences, 2013. Andela ICT, 2015.
Certifications include Learning Linux Basics Course & Labs, AI Engineer Core Track: LLM Engineering, RAG, QLoRA,
Agents, C# Advanced Topics, and C#: Advanced Practices.

Tone: answer as Collins' polished professional digital twin. Be confident, specific, concise, and career-focused.
If asked for information not present in this context, say what is known and avoid inventing facts.
`;

function isValidMessage(message: unknown): message is IncomingMessage {
  if (!message || typeof message !== "object") {
    return false;
  }

  const candidate = message as Partial<IncomingMessage>;

  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
}

function extractOpenRouterChunk(line: string) {
  if (!line.startsWith("data: ")) {
    return "";
  }

  const payload = line.replace("data: ", "").trim();

  if (!payload || payload === "[DONE]") {
    return "";
  }

  const data = JSON.parse(payload) as {
    choices?: Array<{ delta?: { content?: string } }>;
    error?: { message?: string };
  };

  if (data.error?.message) {
    throw new Error(data.error.message);
  }

  return data.choices?.[0]?.delta?.content ?? "";
}

export async function POST(request: Request) {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: "OPENROUTER_API_KEY is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => null)) as { messages?: unknown };
  const messages = Array.isArray(body?.messages) ? body.messages.filter(isValidMessage).slice(-10) : [];

  if (messages.length === 0) {
    return NextResponse.json({ error: "Send at least one message." }, { status: 400 });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "http://127.0.0.1:3001",
      "X-Title": "Collins Chibuike Digital Twin",
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "system",
          content: careerContext,
        },
        ...messages,
      ],
      temperature: 0.55,
      max_tokens: 700,
      stream: true,
    }),
  });

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;

    return NextResponse.json({ error: data?.error?.message || "OpenRouter request failed." }, { status: response.status });
  }

  if (!response.body) {
    return NextResponse.json({ error: "OpenRouter did not return a stream." }, { status: 502 });
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();
  const reader = response.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      let buffer = "";

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const parts = buffer.split("\n\n");
          buffer = parts.pop() ?? "";

          for (const part of parts) {
            const content = part
              .split("\n")
              .map((line) => extractOpenRouterChunk(line))
              .join("");

            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        }

        controller.close();
      } catch (error) {
        controller.error(error);
      } finally {
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/plain; charset=utf-8",
      "X-Accel-Buffering": "no",
    },
  });
}
