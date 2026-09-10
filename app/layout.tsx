import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MeterOn — Sinun taksisi. Sinun tapasi ajaa.',
  description: 'Valitse Semel-taksamittari, lisävarusteet ja 6, 12 tai 24 kuukauden sopimus. Vertaa kuukausihintoja heti.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi">
      <body
        className="antialiased"
      >
        {children}
      </body>
    </html>
  );
}
