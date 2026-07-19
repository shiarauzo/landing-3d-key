"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type State = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;

    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      setState("error");
      setMessage("Ese correo no se ve válido");
      return;
    }

    setState("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();

      if (!res.ok) {
        setState("error");
        setMessage(data?.error ?? "Algo salió mal");
        return;
      }
      setState("success");
      setMessage(data?.alreadyIn ? "Ya estabas dentro ✦" : "Estás dentro ✦");
    } catch {
      setState("error");
      setMessage("Sin conexión. Inténtalo de nuevo");
    }
  }

  return (
    <div className="w-full max-w-md">
      <AnimatePresence mode="wait">
        {state === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="tnum flex items-center gap-3 rounded-full border border-[color:var(--accent)] bg-[var(--accent-soft)] px-6 py-4 text-sm"
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[color:var(--accent)]" />
            {message} — te escribiremos primero.
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2 rounded-full border border-line bg-white/[0.02] px-2 py-2 transition-colors focus-within:border-[color:var(--accent)]">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="tu@correo.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (state === "error") setState("idle");
                }}
                aria-label="Correo electrónico"
                className="tnum min-w-0 flex-1 bg-transparent px-4 py-2 text-sm outline-none placeholder:text-muted"
              />
              <button
                type="submit"
                disabled={state === "loading"}
                className="tnum shrink-0 rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50"
              >
                {state === "loading" ? "..." : "Entrar"}
              </button>
            </div>

            <div className="tnum h-4 px-4 text-xs">
              {state === "error" ? (
                <span className="text-red-400">{message}</span>
              ) : (
                <span className="text-muted">Sin spam. Solo el lanzamiento.</span>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
