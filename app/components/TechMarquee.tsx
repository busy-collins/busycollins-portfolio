const ITEMS = [
  "OpenAI Agents SDK",
  "LangGraph",
  "AWS Lambda",
  "MCP Protocol",
  "Terraform",
  "Playwright",
  "FastAPI",
  "Aurora PostgreSQL",
  "SQS",
  "S3 Vectors",
  "Docker",
  "Next.js",
  "Clerk Auth",
  "SageMaker",
];

export function TechMarquee() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="marquee" aria-label="Technology stack">
      <div className="marqueeTrack" aria-hidden="true">
        {doubled.map((item, i) => (
          <span key={i} className="marqueeItem">
            {item}
            <span className="marqueeDot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
