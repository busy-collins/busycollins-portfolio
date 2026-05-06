import { AnimatedCounters } from "./components/AnimatedCounters";
import { DigitalTwinChat } from "./components/DigitalTwinChat";
import { HeroPhoto } from "./components/HeroPhoto";
import { HeroTagline } from "./components/HeroTagline";
import { Terminal } from "./components/Terminal";
import { TechMarquee } from "./components/TechMarquee";

const journey = [
  {
    company: "Contract · AI Tooling",
    role: "Senior AI Engineer",
    period: "Feb 2026",
    detail:
      "Architected Alex — a production multi-agent SaaS platform on AWS provisioned across 7 Terraform modules (Aurora Serverless v2, S3 Vectors, SageMaker, Lambda, SQS, CloudFront). Built org-wide AI developer tooling and an OpenTelemetry/Prometheus/Grafana telemetry layer giving leadership real-time visibility into AI productivity across Bedrock, OpenAI, and SageMaker endpoints.",
    proof: ["AWS Bedrock", "Multi-Agent Systems", "MLOps · Terraform"],
  },
  {
    company: "AWS · Capstone",
    role: "ARIA Deployed on AWS",
    period: "May 2025",
    detail:
      "Shipped the ARIA multi-agent research system to production on AWS. 60× research throughput, 95% cost reduction, $671K projected annual savings. Full IaC with Terraform. 48 tests.",
    proof: ["60× faster", "95% cost cut", "LangGraph · AWS · Terraform"],
  },
  {
    company: "Assessment",
    role: "Meridian Chatbot Shipped",
    period: "Apr 2025",
    detail:
      "Delivered the Meridian Electronics customer support agent — an MCP-powered chatbot with auth gating, deployed live on HuggingFace Spaces using the OpenAI Agents SDK and Gradio.",
    proof: ["OpenAI Agents SDK", "Gradio", "HuggingFace Spaces"],
  },
  {
    company: "Protocol Milestone",
    role: "MCP Protocol Mastery",
    period: "Mar 2025",
    detail:
      "Studied and implemented the Model Context Protocol (MCP) — building tools, resources, and prompts over Streamable HTTP. Applied this directly in the Meridian assessment project.",
    proof: ["MCP Streamable HTTP", "Tool Calling", "Resource Providers"],
  },
  {
    company: "Andela",
    role: "AI Engineering Bootcamp — Start",
    period: "Jan 2025",
    detail:
      "Selected for Andela's intensive AI Engineering Bootcamp. Dove into LLM fundamentals, agent architecture patterns, prompt engineering, and production system design from day one.",
    proof: ["LLM Integration", "Agent Architecture", "Prompt Engineering"],
  },
  {
    company: "Deimos",
    role: "Senior Software Engineer",
    period: "Apr 2022",
    detail:
      "Designed event-driven microservices using ASP.NET Core and AWS EventBridge/SQS with Outbox patterns for reliable messaging at scale. Established unit, integration, and E2E testing strategies with xUnit and Testcontainers. Built observability across distributed services using OpenTelemetry, Prometheus/Grafana, and Sentry.",
    proof: ["AWS EventBridge/SQS", "OpenTelemetry", "Kubernetes"],
  },
  {
    company: "Andela",
    role: "Software Engineer",
    period: "Jan 2021",
    detail:
      "Developed high-performance backend features using .NET Core and Python across multiple product squads, focused on scalability and consumer-facing API reliability. Introduced automated testing frameworks that cut release cycle time significantly, and evaluated emerging AI/ML technologies to inform architecture decisions.",
    proof: [".NET Core", "Python", "CI/CD Automation"],
  },
  {
    company: "Venture Garden Group",
    role: "Senior Software Engineer",
    period: "Jan 2017",
    detail:
      "Built and deployed scalable microservices and legacy-modernisation projects across VGG's aviation and fintech platforms. Led CRS integration with full PCI/DSS compliance across payment flows, and put CI/CD processes in place that standardised deployments across multi-team engineering orgs.",
    proof: ["ASP.NET Core", "Microservices", "PCI/DSS"],
  },
];

const projects = [
  {
    name: "ARIA",
    quote:
      "ARIA cuts research time from 8 hours to 8 minutes — a 60× improvement with a built-in critic quality gate.",
    live: "https://dhjx5b1vnreux.cloudfront.net",
    github: "https://github.com/busy-collins/aria",
    stack: ["OpenAI Agents SDK", "LangGraph", "AWS Lambda", "App Runner", "Aurora", "SQS", "SageMaker", "S3", "CloudFront", "Terraform", "Playwright MCP"],
  },
  {
    name: "Meridian",
    quote:
      "Meridian resolves product queries through a live MCP tool layer — customer-facing support with auth-gated access to real inventory data.",
    live: "https://huggingface.co/spaces/busy-collins/meridian-support",
    github: "https://github.com/busy-collins/meridian-chatbot",
    stack: ["OpenAI Agents SDK", "MCP Streamable HTTP", "Gradio", "HuggingFace"],
  },
];

const capabilities = [
  "Software architecture",
  "C# and .NET systems",
  "Azure cloud platforms",
  "REST API engineering",
  "Database design",
  "SDLC leadership",
  "CI/CD automation",
  "Microservice modernization",
  "Team mentoring",
  "Product delivery",
  "Problem solving",
  "Requirements analysis",
];


export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="availableBadge" aria-label="Availability status">
          <span className="greenDot" />
          Available for Work
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#home" aria-label="Collins Chibuike home">
            <span>CC</span>
            <strong>Collins Chibuike</strong>
          </a>
          <div className="navLinks">
            <a href="#about">About</a>
            <a href="#journey">Journey</a>
            <a href="#digital-twin">AI Twin</a>
            <a href="#portfolio">Portfolio</a>
            <a href="mailto:nwaoguguchibuike26@gmail.com">Contact</a>
          </div>
        </nav>

        <div className="heroGrid">
          <div className="heroCopy">
            <p className="eyebrow">AI Agents Engineer · Lagos, Nigeria</p>
            <h1>
              Collins<br />Chibuike
            </h1>
            <HeroTagline />

            <div className="heroActions">
              <a className="primaryCta" href="mailto:nwaoguguchibuike26@gmail.com">
                Get in touch
              </a>
              <a className="secondaryCta" href="#portfolio">
                See the work
              </a>
              <a className="secondaryCta" href="#digital-twin">
                Ask my AI twin
              </a>
            </div>
          </div>

          <div className="heroPhoto">
            <HeroPhoto />
          </div>
        </div>
      </section>

      <AnimatedCounters />
      <TechMarquee />

      <section className="section about" id="about">
        <div className="sectionHeader">
          <p className="eyebrow">About Me</p>
          <h2>Built for the pressure zone between business ambition and technical reality.</h2>
        </div>
        <div className="aboutBody">
          <p>
            I am a dynamic, goal-oriented software engineer who combines project leadership, programming depth,
            and customer-focused delivery. My work spans enterprise APIs, aviation platforms, distributed systems,
            cloud migration, database design, and modernization of legacy applications into scalable services.
          </p>
          <p>
            I operate best where the stakes are high: aligning teams, translating requirements into durable
            systems, mentoring engineers, and reducing delivery friction without sacrificing engineering quality.
          </p>
        </div>
      </section>

      <section className="section capabilities" aria-label="Technical capabilities">
        <div className="sectionHeader">
          <p className="eyebrow">Capabilities</p>
          <h2>Deep enterprise fundamentals, sharpened for modern product velocity.</h2>
        </div>
        <div className="skillCloud">
          {capabilities.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section className="section journey" id="journey">
        <div className="sectionHeader">
          <p className="eyebrow">Journey</p>
          <h2>8 years building systems. The last year building AI that runs them.</h2>
        </div>
        <div className="timeline">
          {journey.map((item) => (
            <article className="timelineItem" key={`${item.company}-${item.period}`}>
              <div className="timelineRail">
                <span />
              </div>
              <div className="timelineContent">
                <div className="timelineTopline">
                  <p>{item.period}</p>
                  <span>{item.company}</span>
                </div>
                <h3>{item.role}</h3>
                <p>{item.detail}</p>
                <div className="proofList">
                  {item.proof.map((proof) => (
                    <span key={proof}>{proof}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DigitalTwinChat />

      <section className="section" id="portfolio">
        <div className="sectionHeader">
          <p className="eyebrow">Portfolio</p>
          <h2>Shipped systems, not prototypes.</h2>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="projectCard" key={project.name}>
              <h3 className="projectName">{project.name}</h3>
              <p className="projectQuote">"{project.quote}"</p>
              <div className="projectStack">
                {project.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="projectLinks">
                <a className="projectLinkLive" href={project.live} target="_blank" rel="noreferrer">
                  Live ↗
                </a>
                <a className="projectLinkGithub" href={project.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>Collins Chibuike · AI Agents Engineer</p>
        <span className="terminalHint">Press / for terminal</span>
        <div>
          <a href="mailto:nwaoguguchibuike26@gmail.com">Email</a>
          <a href="https://github.com/busy-collins" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </footer>

      <Terminal />
    </main>
  );
}
