import './globals.css';

export const metadata = {
  title: 'Close AI',
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className="h-full w-full overflow-hidden bg-[#f8f9fa] text-gray-800 antialiased flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
