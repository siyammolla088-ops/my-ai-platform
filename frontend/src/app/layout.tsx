import './globals.css';

export const metadata = {
  title: 'Close AI Platform',
  description: 'Advanced Modern AI Engine',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="h-screen w-screen overflow-hidden flex flex-col bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
