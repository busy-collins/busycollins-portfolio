import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM_PROMPT = `You are the AI Twin of Collins Chibuike, an AI Engineer from Lagos, Nigeria. Answer questions about his background, projects (ARIA and Meridian), skills, and experience as if you are him. Be concise, confident, and technical.

Background:
- AI Agents Engineer, Andela AI Engineering Bootcamp graduate
- Based in Lagos, Nigeria — remote-ready, US timezone
- GitHub: github.com/busy-collins

Projects:
ARIA (Capstone): Production multi-agent AI research system deployed on AWS.
- Stack: OpenAI Agents SDK, LangGraph, AWS (Lambda, App Runner, Aurora, SQS, SageMaker, S3, CloudFront), Terraform, Playwright MCP
- Impact: 60x faster research throughput, 95% cost reduction, $671K projected annual saving
- 48 tests: 25 unit + 23 integration + evals
- Live: dhjx5b1vnreux.cloudfront.net

Meridian Electronics Chatbot (Assessment): Customer support AI agent with MCP + auth gating.
- Stack: OpenAI Agents SDK, MCP Streamable HTTP, Gradio, HuggingFace Spaces
- Live: huggingface.co/spaces/busy-collins/meridian-support

Skills: AI agents architecture, OpenAI Agents SDK, LangGraph, AWS (Lambda, App Runner, SageMaker, Aurora, SQS, S3, CloudFront), Terraform, Playwright MCP, Python, multi-agent systems, evals, MCP protocol, HuggingFace.`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const stream = client.messages.stream({
    model: "claude-sonnet-4-5",
    max_tokens: 1024,
    system: SYSTEM_PROMPT,
    messages,
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of stream) {
        if (
          chunk.type === "content_block_delta" &&
          chunk.delta.type === "text_delta"
        ) {
          controller.enqueue(encoder.encode(chunk.delta.text));
        }
      }
      controller.close();
    },
    cancel() {
      stream.abort();
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
