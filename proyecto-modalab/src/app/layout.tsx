import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Modalab | Administración",
  description: "Prototipo académico del módulo administrativo de Modalab",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
