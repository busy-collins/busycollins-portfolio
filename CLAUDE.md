## Design Direction

Reference site: https://glen-louis.vercel.app (study this carefully)

### Aesthetic
- Near-black background (#0a0a0a), white text, one accent color: a warm amber/orange (#f97316)
- Monochrome with intentional restraint — no gradients, no glow effects
- Large, heavy typography for name and section titles
- Generous whitespace — sections breathe, nothing feels cramped

### Hero section must have
- "Available for Work" pill: small green pulsing dot + "Available for Work" text, top-left or top-right
- Name split across two lines in very large weight (80px+), not centered — left-aligned
- Rotating word: "I build [Autonomous / Production / Resilient] AI Agents" — word cycles with fade
- Real headshot photo (circular or card, right side of hero)
- Animated counters that trigger on scroll: 60× faster, 95% cost reduction, $671K saved
- Tech marquee below hero: scrolling row of tech names (OpenAI · LangGraph · AWS · MCP · Terraform · Playwright · FastAPI · Aurora · SQS · S3 · Docker)

### Project cards
- Dark card, subtle border
- One bold impact quote in quotation marks, not bullet points
- Tags for tech stack
- Two buttons: Live ↗ and GitHub ↗

### Copy tone
- First person, direct: "I built ARIA because research teams were drowning in manual work"
- Specific and honest: real numbers, real problems solved
- No corporate language ("leverage", "utilize", "robust solution")

### Animations (use Framer Motion)
- Counters count up from 0 on scroll
- Rotating words fade in/out
- Sections fade up as they enter viewport
- Subtle — nothing bounces or spins

### Footer easter egg
- Small text: "Press / for terminal" — opens a fake terminal that accepts a few commands
  (help, projects, contact, clear)