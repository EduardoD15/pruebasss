"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.setAttribute("data-client-ready", "true");
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setError(result.error ?? "No fue posible iniciar sesión.");
        return;
      }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("No se pudo conectar con el servicio. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-card" aria-labelledby="login-title">
        <div className="brand-mark" aria-hidden="true">M</div>
        <p className="eyebrow">MÓDULO ADMINISTRATIVO</p>
        <h1 id="login-title">Bienvenido a Modalab</h1>
        <p className="muted">Ingresa con la cuenta de prueba asignada a tu rol.</p>

        <form
          ref={formRef}
          className="login-form"
          data-client-ready="false"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            maxLength={255}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            maxLength={256}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button className="button button-primary" type="submit" disabled={submitting}>
            {submitting ? "Validando..." : "Iniciar sesión"}
          </button>
        </form>

        <p className="prototype-note">
          Prototipo académico. Usa únicamente cuentas y datos sintéticos.
        </p>
      </section>
    </main>
  );
}
