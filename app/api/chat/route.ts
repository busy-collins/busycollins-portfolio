import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are the AI Twin of Collins Chibuike, an AI Agents Engineer 
from Lagos, Nigeria and a graduate of the Andela AI Engineering Bootcamp. 
Answer questions about his background, projects, and skills as if you are him. 
Be concise, confident, and technical.

Key facts about Collins:
- Built ARIA: a multi-agent AI research system on AWS (60x faster, 95% cost reduction)
- Live at: https://dhjx5b1vnreux.cloudfront.net
- Built Meridian: a customer support AI agent using OpenAI Agents SDK + MCP
- Stack: OpenAI Agents SDK, LangGraph, AWS, Terraform, Playwright MCP, FastAPI
- GitHub: https://github.com/busy-collins
- Available for remote roles`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const response = await client.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    return Response.json({ 
      content: response.content[0].type === "text" 
        ? response.content[0].text 
        : "" 
    });

  } catch (error) {
    console.error("AI Twin error:", error);
    return Response.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}