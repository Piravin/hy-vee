import './globals.css';

export const metadata = {
  title: 'Hy Vee',
  description: 'Guess age, gender and country based on name',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
