"use client";

import { useState } from "react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Demande de ${name || "contact"}`);
    const body = encodeURIComponent(
      `${message}\n\n${name}\n${email}`.trim(),
    );
    window.location.href = `mailto:contact@gssvdesign.com?subject=${subject}&body=${body}`;
  };

  return (
    <form onSubmit={onSubmit} className="max-w-[430px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-7 gap-y-8">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
        />
        <input
          type="text"
          name="name"
          required
          placeholder="Nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
      </div>
      <textarea
        name="message"
        required
        rows={4}
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="field mt-10 resize-y"
      />
      <div className="mt-10 flex justify-end">
        <button
          type="submit"
          className="serif-italic inline-flex items-center gap-1 text-[18px] text-[color:var(--color-ink)] hover:opacity-60 transition-opacity"
        >
          Envoyer
          <svg width="8" height="12" viewBox="0 0 8 12" fill="none" aria-hidden>
            <path d="M1.5 1l5 5-5 5" stroke="currentColor" strokeWidth="1.2" />
          </svg>
        </button>
      </div>
    </form>
  );
}
