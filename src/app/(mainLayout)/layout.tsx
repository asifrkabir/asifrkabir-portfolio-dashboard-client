export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-screen w-full p-8">{children}</div>
    </div>
  );
}
