"use client"

import { Button } from "@/components/ui/button"
import { LogOutIcon } from "lucide-react"

export function SignOutButton() {
  return (
    <Button variant="outline" size="icon">
      <LogOutIcon />
    </Button>
  )
}
