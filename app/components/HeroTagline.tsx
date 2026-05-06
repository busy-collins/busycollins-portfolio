"use client";

import { useEffect, useState } from "react";

const WORDS = ["Autonomous", "Resilient", "Production-Grade", "Multi-Agent"];
const VISIBLE_MS = 2000;
const FADE_MS = 300;

export function HeroTagline() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setVisible(true);
      }, FADE_MS);
    }, VISIBLE_MS + FADE_MS);

    return () => clearInterval(interval);
  }, []);

  return (
    <p className="lede">
      I build{" "}
      <span
        className="rotatingWord"
        style={{
          opacity: visible ? 1 : 0,
          transition: `opacity ${FADE_MS}ms ease`,
        }}
      >
        {WORDS[index]}
      </span>
      {" "}AI Agents in production.
    </p>
  );
}
