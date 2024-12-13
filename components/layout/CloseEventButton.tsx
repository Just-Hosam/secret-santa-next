"use client"

import { Button } from "@/components/ui/button"
import { SendIcon } from "lucide-react"

export default function CloseEventButton() {
  const closeEvent = () => {
    console.log("SEND EMAILS")
  }

  return (
    <Button className="w-full" onClick={closeEvent}>
      Send Emails
      <SendIcon />
    </Button>
  )
}
