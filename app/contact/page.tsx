import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Jarl Nelson",
  description: "Available for select conversations. jarlnelson@outlook.com.",
};

export default function ContactPage() {
  return (
    <article className="max-w-2xl mx-auto px-6 py-16 sm:py-24">
      <header className="mb-10">
        <div className="text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-4">
          Contact
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
          Available for select conversations.
        </h1>
      </header>

      <div className="space-y-5 text-zinc-700 dark:text-zinc-300 leading-relaxed text-[17px]">
        <p>
          I&apos;m happy to hear from people working on AI in financial services, on agent
          architecture, on buy-side technology generally, or on something interesting I
          haven&apos;t thought of yet.
        </p>

        <p>
          <a
            href="mailto:jarlnelson@outlook.com"
            className="text-accent dark:text-accent-dark hover:underline text-lg font-medium"
          >
            jarlnelson@outlook.com
          </a>
        </p>

        <p className="text-sm text-zinc-500 dark:text-zinc-400">San Diego, California.</p>
      </div>
    </article>
  );
}
