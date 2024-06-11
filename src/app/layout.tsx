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
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body className='flex flex-col'>{children}</body>
    </html>
  )
}
