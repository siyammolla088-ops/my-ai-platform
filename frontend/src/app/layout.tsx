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
    <html lang="bn" className="h-full w-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="h-full w-full overflow-hidden bg-slate-100 text-slate-800 antialiased flex flex-col">
        {children}
      </body>
    </html>
  );
}
