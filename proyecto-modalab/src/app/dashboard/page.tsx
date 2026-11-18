"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { UserRole } from "@/lib/auth-policy";

type SessionUser = {
  email: string;
  role: UserRole;
};

const roleLabels: Record<UserRole, string> = {
  admin: "Administrador",
  seller: "Vendedor",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then(async (response) => {
        if (!response.ok) {
          router.replace("/");
          return null;
        }
        return (await response.json()) as { user: SessionUser };
      })
      .then((result) => {
        if (active && result) setUser(result.user);
      })
      .catch(() => router.replace("/"))
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [router]);

  async function signOut() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/");
    router.refresh();
  }

  if (loading) {
    return <main className="page-shell"><p className="muted">Cargando sesión...</p></main>;
  }
  if (!user) return null;

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="wordmark" href="/dashboard">modalab<span>.</span></Link>
        <button className="button button-quiet" onClick={signOut}>Cerrar sesión</button>
      </header>

      <section className="welcome-panel">
        <div>
          <p className="eyebrow">PANEL ADMINISTRATIVO</p>
          <h1>Hola, {roleLabels[user.role]}</h1>
          <p className="muted">{user.email}</p>
        </div>
        <span className="role-pill">{roleLabels[user.role]}</span>
      </section>

      <section className="content-grid" aria-label="Funciones disponibles">
        <article className="feature-card">
          <span className="card-icon" aria-hidden="true">01</span>
          <h2>Tu espacio de trabajo</h2>
          <p>
            Este prototipo valida el inicio de sesión, la autenticación y los
            permisos del módulo administrativo.
          </p>
        </article>
        {user.role === "admin" ? (
          <article className="feature-card">
            <span className="card-icon" aria-hidden="true">02</span>
            <h2>Usuarios y permisos</h2>
            <p>Consulta las cuentas sintéticas habilitadas para las pruebas.</p>
            <Link className="text-link" href="/admin/users">Ver usuarios →</Link>
          </article>
        ) : (
          <article className="feature-card">
            <span className="card-icon" aria-hidden="true">02</span>
            <h2>Acceso de vendedor</h2>
            <p>Tu sesión está limitada a las funciones permitidas para tu rol.</p>
          </article>
        )}
      </section>

      <footer className="page-footer">
        Prototipo académico de Modalab · Solo se incluyen F01, F02 y F03.
      </footer>
    </main>
  );
}
