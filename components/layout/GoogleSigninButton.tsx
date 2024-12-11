"use client"

import { Button } from "@/components/ui/button"
import { signIn } from "next-auth/react"
import Image from "next/image"

export function GoogleSigninButton() {
  return (
    <div className="mx-auto w-fit">
      <Button onClick={() => signIn("google")} variant="outline">
        <Image
          src="/google-logo.png"
          alt="Google Logo"
          width={18}
          height={18}
        ></Image>
        <p className="text-base">Login with Google</p>
      </Button>
    </div>
  )
}
