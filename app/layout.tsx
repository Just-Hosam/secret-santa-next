import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { SignOutButton } from "@/components/layout/SignoutButton"
import AuthProvider from "@/components/layout/AuthProvider"
import AuthCheck from "@/components/layout/AuthCheck"

export const metadata: Metadata = {
  title: "Secret Santa App",
  description: "Manage you Secret Santa with ease.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AuthProvider>
      <html className="font-mont text-base px-6 pt-6 pb-10 " lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>
          <nav className="flex justify-between items-center mb-6 gap-6">
            <Link href="/" className="text-2xl flex-1 font-light">
              Secret Santa
            </Link>
            <AuthCheck>
              <SignOutButton />
            </AuthCheck>
          </nav>
          {children}
        </body>
      </html>
    </AuthProvider>
  )
}
