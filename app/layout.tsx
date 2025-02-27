import { Providers } from "@/app/providers"
import ThemeSwitch from "@/components/themeSwitch"
import AuthButton from "@/components/header-auth"
import "./globals.css"

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000"

export const metadata = {
  //metadataBase: new URL(defaultUrl),
  title: "2do",
  description: "Get your life on track!",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`antialiased`} suppressHydrationWarning>
        <Providers>
          <AuthButton />
          <div className='flex items-center flex-col bg-background h-dvh pt-[8rem] transition-colors'>
            <div className='bg-container p-[3rem] rounded-[1rem] flex flex-col gap-[2rem]'>
              <div
                className='w-full flex justify-center'
                suppressHydrationWarning
              >
                <ThemeSwitch />
              </div>
              {children}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
