"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type UserSummary = {
  id: string;
  email: string;
  role: "admin" | "seller";
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [message, setMessage] = useState("Cargando usuarios...");

  useEffect(() => {
    fetch("/api/admin/users")
      .then(async (response) => {
        const result = (await response.json()) as {
          users?: UserSummary[];
          error?: string;
        };
        if (!response.ok) {
          setMessage(result.error ?? "No tienes permiso para consultar esta sección.");
          return;
        }
        setUsers(result.users ?? []);
        setMessage("");
      })
      .catch(() => setMessage("No se pudo conectar con el servicio."));
  }, []);

  return (
    <main className="page-shell">
      <header className="topbar">
        <Link className="wordmark" href="/dashboard">modalab<span>.</span></Link>
        <Link className="button button-quiet" href="/dashboard">Volver al panel</Link>
      </header>
      <section className="table-panel">
        <p className="eyebrow">CONTROL DE ACCESO</p>
        <h1>Usuarios de prueba</h1>
        <p className="muted">La API devuelve solo identificador, correo y rol.</p>
        {message && <p className="status-message" role="status">{message}</p>}
        {users.length > 0 && (
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Correo</th><th>Rol</th></tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.role === "admin" ? "Administrador" : "Vendedor"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
