"use client";

import { useEffect, useRef, useState } from "react";

type Line = { kind: "input" | "output" | "system"; text: string };

const BOOT: Line[] = [
  { kind: "system", text: "collins-portfolio v1.0.0" },
  { kind: "system", text: 'type "help" for available commands.' },
];

function run(raw: string): Line[] | "clear" {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return [
        { kind: "output", text: "  help      list available commands" },
        { kind: "output", text: "  projects  ARIA and Meridian with live URLs" },
        { kind: "output", text: "  contact   email and GitHub" },
        { kind: "output", text: "  clear     clear the terminal" },
      ];
    case "projects":
      return [
        { kind: "output", text: "ARIA" },
        { kind: "output", text: "  live    https://dhjx5b1vnreux.cloudfront.net" },
        { kind: "output", text: "  github  https://github.com/busy-collins/aria" },
        { kind: "output", text: "" },
        { kind: "output", text: "Meridian" },
        { kind: "output", text: "  live    https://huggingface.co/spaces/busy-collins/meridian-support" },
        { kind: "output", text: "  github  https://github.com/busy-collins/meridian-chatbot" },
      ];
    case "contact":
      return [
        { kind: "output", text: "  email   nwaoguguchibuike26@gmail.com" },
        { kind: "output", text: "  github  https://github.com/busy-collins" },
      ];
    case "clear":
      return "clear";
    case "":
      return [];
    default:
      return [{ kind: "output", text: `command not found: ${raw.trim()}` }];
  }
}

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) return;
      if (e.key === "/") {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function submit(e: { preventDefault(): void }) {
    e.preventDefault();
    const cmd = input;
    setInput("");

    const result = run(cmd);
    if (result === "clear") {
      setLines(BOOT);
      return;
    }

    setLines((prev) => [
      ...prev,
      ...(cmd.trim() ? [{ kind: "input" as const, text: cmd }] : []),
      ...result,
    ]);
  }

  if (!open) return null;

  return (
    <div
      className="termOverlay"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="termWindow" role="dialog" aria-modal="true" aria-label="Terminal">
        <div className="termBar">
          <div className="termDots">
            <button className="termDot termDotRed" onClick={() => setOpen(false)} aria-label="Close terminal" />
            <span className="termDot termDotYellow" />
            <span className="termDot termDotGreen" />
          </div>
          <span className="termTitle">collins@portfolio — bash</span>
          <span className="termEsc">esc to close</span>
        </div>

        <div className="termBody" ref={bodyRef}>
          {lines.map((line, i) => (
            <div key={i} className={`termLine termLine--${line.kind}`}>
              {line.kind === "input" && <span className="termPromptGlyph">$ </span>}
              {line.text}
            </div>
          ))}
        </div>

        <form className="termInputRow" onSubmit={submit}>
          <span className="termPromptGlyph">$ </span>
          <input
            ref={inputRef}
            className="termInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
