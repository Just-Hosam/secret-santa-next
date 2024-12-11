"use client"

import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

export function SignOutButton() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center gap-2">
      <div className="text-right">
        <p>{session?.user?.name}</p>
        <p className="text-xs italic">{session?.user?.email}</p>
      </div>
      <Button onClick={() => signOut()} variant="outline">
        <LogOutIcon />
      </Button>
    </div>
  )
}
