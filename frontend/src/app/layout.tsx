import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Close AI Platform',
  description: 'Advanced Modern AI Engine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body>{children}</body>
    </html>
  );
}
