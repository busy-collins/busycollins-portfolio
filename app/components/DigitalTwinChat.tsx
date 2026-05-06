"use client";

import { useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterPrompts = [
  "Tell me about ARIA — what problem does it solve?",
  "How did you cut costs by 95% with ARIA?",
  "What is the Meridian chatbot and how does MCP work?",
  "What's your AI engineering stack?",
];

export function DigitalTwinChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "I'm Collins' AI Twin. Ask me about ARIA, Meridian, my AI engineering stack, or what it takes to ship production multi-agent systems.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const visibleMessages = useMemo(() => messages.slice(-8), [messages]);

  async function sendMessage(messageText: string) {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmedMessage }];

    setMessages(nextMessages);
    setInput("");
    setError("");
    setIsLoading(true);
    setMessages([...nextMessages, { role: "assistant", content: "" }]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;

        throw new Error(data?.error || "The digital twin could not respond right now.");
      }

      if (!response.body) {
        throw new Error("The digital twin did not return a stream.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const readStream = async (): Promise<string> => {
        const { done, value } = await reader.read();

        if (done) {
          return "";
        }

        const chunk = decoder.decode(value, { stream: true });

        setMessages((currentMessages) =>
          currentMessages.map((message, index) =>
            index === currentMessages.length - 1 ? { ...message, content: `${message.content}${chunk}` } : message,
          ),
        );

        return `${chunk}${await readStream()}`;
      };

      const streamedMessage = await readStream();

      if (!streamedMessage.trim()) {
        throw new Error("The digital twin returned an empty response.");
      }
    } catch (caughtError) {
      setMessages(nextMessages);
      setError(caughtError instanceof Error ? caughtError.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: { preventDefault(): void }) {
    event.preventDefault();
    void sendMessage(input);
  }

  return (
    <section className="section twinSection" id="digital-twin">
      <div className="twinShell">
        <div className="twinIntro">
          <p className="eyebrow">AI Twin</p>
          <h2>Ask me anything.</h2>
          <p>
            This is an AI version of Collins — powered by Claude and trained on his projects, stack, and experience.
            Ask about ARIA, Meridian, AI agents, or what it takes to ship production AI systems.
          </p>

          <div className="promptStack" aria-label="Suggested questions">
            {starterPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void sendMessage(prompt)} disabled={isLoading}>
                {prompt}
              </button>
            ))}
          </div>
        </div>

        <div className="chatPanel" aria-label="Digital twin chat">
          <div className="chatHeader">
            <div>
              <span className="pulse" />
              <strong>Digital Twin Online</strong>
            </div>
            <span>claude-sonnet · streaming</span>
          </div>

          <div className="messages" aria-live="polite">
            {visibleMessages.map((message, index) => (
              <div
                className={`message ${message.role} ${isLoading && index === visibleMessages.length - 1 ? "streaming" : ""}`}
                key={`${message.role}-${index}`}
              >
                <span>{message.role === "user" ? "You" : "Collins AI"}</span>
                <p>{message.content || "Connecting to Collins AI..."}</p>
              </div>
            ))}
          </div>

          {error ? <p className="chatError">{error}</p> : null}

          <form className="chatForm" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              aria-label="Ask the digital twin a question"
              disabled={isLoading}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about ARIA, Meridian, AI agents, or my engineering stack…"
              value={input}
            />
            <button type="submit" disabled={isLoading || !input.trim()}>
              Ask
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
