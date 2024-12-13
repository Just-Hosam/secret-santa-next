import AuthCheck from "@/components/layout/AuthCheck"
import AuthProvider from "@/components/layout/AuthProvider"
import { SignOutButton } from "@/components/layout/SignoutButton"
import { authOptions } from "@/lib/auth-options"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import "./globals.css"

export const metadata: Metadata = {
  title: "Secret Santa App",
  description: "Manage you Secret Santa with ease.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <AuthProvider>
      <html className="font-mont text-base px-6 pb-10 " lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <nav className="flex justify-between items-center mb-1 gap-6 max-w-[1200px] m-auto py-6  top-0 left-0 right-0 bg-white sticky">
            <Link href="/">
              <Image
                src="/secret-santa-logo.png"
                alt="Secret Santa Logo"
                width={40}
                height={40}
              ></Image>
            </Link>
            <AuthCheck>
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <p>{session?.user?.name}</p>
                  <p className="text-xs text-[10px] italic">
                    {session?.user?.email}
                  </p>
                </div>
                <SignOutButton />
              </div>
            </AuthCheck>
          </nav>
          <div className="max-w-[700px] m-auto">{children}</div>
        </body>
      </html>
    </AuthProvider>
  )
}
