import type { Metadata } from "next"
import "./globals.css"
import Link from "next/link"
import { SignOutButton } from "@/components/layout/SignoutButton"

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
    <html className="font-mont text-base" lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <nav className="flex justify-between p-6">
          <Link href="/" className="text-3xl">
            Secret Santa
          </Link>
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p>Sam</p>
              <p className="text-xs italic">hosam_firas@hotmail.com</p>
            </div>
            <SignOutButton />
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
