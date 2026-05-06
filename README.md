# Collins Chibuike — Portfolio Website

Personal portfolio site for **Nwaogugu Chibuike Collins**, an AI Agents Engineer and graduate of the Andela AI Engineering Bootcamp. Built with Next.js 14, deployed on Vercel.

**Live site:** [busycollins-portfolio.vercel.app](https://busycollins-portfolio.vercel.app)

---

## Features

- **AI Twin** — An interactive Claude-powered version of me. Ask it anything about my background, projects, or skills and it responds as if it were me.
- **Animated hero** — Rotating headline words, scroll-triggered counters, and a live tech marquee.
- **Project showcase** — ARIA (capstone) and Meridian (assessment) with live links, GitHub links, and real impact metrics.
- **Dark, minimal design** — Monochrome palette, heavy typography, Framer Motion animations.
- **Terminal easter egg** — Press `/` anywhere on the page.
- **Responsive** — Works on mobile, tablet, and desktop.

---

## Projects Featured

### ARIA — Autonomous Research Intelligence Agent

Production multi-agent AI research system deployed on AWS. Takes a topic, browses real websites via Playwright MCP, synthesises findings across three specialised agents (analyst → writer → critic), and produces scored intelligence briefings.

- **Live:** [dhjx5b1vnreux.cloudfront.net](https://dhjx5b1vnreux.cloudfront.net)
- **GitHub:** [github.com/busy-collins/aria](https://github.com/busy-collins/aria)
- **Stack:** OpenAI Agents SDK · LangGraph · AWS Lambda · App Runner · Aurora PostgreSQL · SQS · SageMaker · S3 Vectors · CloudFront · Terraform · Playwright MCP · FastAPI · Clerk
- **Impact:** 60× faster · 95% cost reduction · ~$671K annual saving per research team

### Meridian Electronics — Customer Support Chatbot

Customer support AI agent for Meridian Electronics built with the OpenAI Agents SDK. Connects to a hosted MCP server over Streamable HTTP, with deterministic authentication gating and session-aware state.

- **Live:** [huggingface.co/spaces/busy-collins/meridian-support](https://huggingface.co/spaces/busy-collins/meridian-support)
- **GitHub:** [github.com/busy-collins/meridian-chatbot](https://github.com/busy-collins/meridian-chatbot)
- **Stack:** OpenAI Agents SDK · MCP Streamable HTTP · Gradio · HuggingFace Spaces

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | CSS Modules + Framer Motion |
| AI Twin | Anthropic API (`claude-sonnet-4-20250514`) |
| Auth | Clerk (JWT RS256) |
| Deployment | Vercel |

---

## Getting Started

### Prerequisites

- Node.js 18+
- An Anthropic API key (for the AI Twin feature)

### Local development

```bash
# Clone the repo
git clone https://github.com/busy-collins/busycollins-portfolio.git
cd busycollins-portfolio

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your ANTHROPIC_API_KEY to .env.local

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

```bash
ANTHROPIC_API_KEY=sk-ant-...
```

See `.env.example` for the full list.

---

## Project Structure

```
├── app/
│   ├── page.tsx          # Main single-page layout (all sections)
│   ├── layout.tsx        # Root layout and metadata
│   ├── globals.css       # All styles
│   └── api/
│       └── chat/
│           └── route.ts  # AI Twin streaming API route
├── components/           # Reusable components
├── public/
│   ├── photo.jpg         # Headshot
│   └── resume.pdf        # Downloadable resume
├── CLAUDE.md             # Claude Code project instructions
└── .env.example          # Environment variable template
```

---

## Deployment

This site is deployed on Vercel. Every push to `main` triggers an automatic production deployment.

To deploy your own fork:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variable
vercel env add ANTHROPIC_API_KEY

# Push to production
vercel --prod
```

---

## Contact

- **Email:** nwaoguguchibuike26@gmail.com
- **GitHub:** [github.com/busy-collins](https://github.com/busy-collins)
- **LinkedIn:** [linkedin.com/in/collins-chibuike](https://linkedin.com/in/collins-chibuike)

---

*Built with Next.js · Powered by Anthropic · Deployed on Vercel*