"use client";

import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, RefreshCw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { STARTER_QUESTIONS } from "@/lib/agent-knowledge";

export default function AskJarlChat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
    reload,
    setInput,
  } = useChat({
    api: "/api/chat",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [showStarters, setShowStarters] = useState(true);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Hide starters once a conversation begins
  useEffect(() => {
    if (messages.length > 0) setShowStarters(false);
  }, [messages.length]);

  function onStarterClick(question: string) {
    setInput(question);
    setShowStarters(false);
    // Focus the textarea so the user can edit if they want
    inputRef.current?.focus();
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
      }
    }
  }

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-sm font-medium">
          <Sparkles size={15} className="text-accent dark:text-accent-dark" />
          <span>Ask this site&apos;s agent</span>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Claude Haiku 4.5 · streaming
        </div>
      </div>

      {/* Message list */}
      <div
        ref={scrollRef}
        className="px-5 py-5 max-h-[460px] min-h-[180px] overflow-y-auto"
      >
        {messages.length === 0 && (
          <div className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <p className="mb-1">
              I&apos;m an AI agent that knows about Jarl&apos;s background, his work at INDATA,
              and the things he&apos;s built. Ask me anything you&apos;d want to know in a
              first meeting.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              I won&apos;t commit Jarl to anything or speak for him — for that, email him at{" "}
              <a
                href="mailto:jarlnelson@outlook.com"
                className="text-accent dark:text-accent-dark hover:underline"
              >
                jarlnelson@outlook.com
              </a>
              .
            </p>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-4 ${m.role === "user" ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-4 py-2.5 rounded-lg max-w-[88%] text-sm leading-relaxed ${
                m.role === "user"
                  ? "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
                  : "bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 prose-sm"
              }`}
            >
              {m.role === "assistant" ? (
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-accent dark:text-accent-dark hover:underline"
                          target={href?.startsWith("http") ? "_blank" : undefined}
                          rel={
                            href?.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          {children}
                        </a>
                      ),
                      p: ({ children }) => (
                        <p className="mb-2 last:mb-0">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc pl-5 space-y-1 mb-2">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal pl-5 space-y-1 mb-2">{children}</ol>
                      ),
                      code: ({ children }) => (
                        <code className="px-1 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-[0.9em]">
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              ) : (
                m.content
              )}
            </div>
          </div>
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <div className="text-left mb-4">
            <div className="inline-block px-4 py-2.5 rounded-lg bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse" />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-pulse"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-left mb-4">
            <div className="inline-block px-4 py-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-sm text-red-800 dark:text-red-300">
              Something went wrong. {error.message || "Please try again."}{" "}
              <button
                onClick={() => reload()}
                className="inline-flex items-center gap-1 underline ml-1 hover:no-underline"
              >
                <RefreshCw size={11} /> retry
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Starter chips */}
      {showStarters && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {STARTER_QUESTIONS.map((q) => (
            <button
              key={q}
              onClick={() => onStarterClick(q)}
              className="text-xs px-2.5 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-950 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="border-t border-zinc-200 dark:border-zinc-800 px-3 py-3 flex items-end gap-2"
      >
        <textarea
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyDown={onKeyDown}
          placeholder="Ask about Jarl, NEXUS, the work, the running…"
          rows={1}
          disabled={isLoading}
          className="flex-1 resize-none bg-transparent text-sm leading-relaxed px-2 py-1.5 focus:outline-none placeholder:text-zinc-400 dark:placeholder:text-zinc-600 max-h-32"
          style={{ minHeight: "32px" }}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="p-2 rounded-md bg-zinc-900 dark:bg-zinc-100 text-zinc-50 dark:text-zinc-900 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          aria-label="Send"
        >
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
