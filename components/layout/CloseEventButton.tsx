"use client"

import { Button } from "@/components/ui/button"

export default function CloseEventButton() {
  const closeEvent = () => {
    console.log("SEND EMAILS")
  }

  return (
    <Button className="w-full" onClick={closeEvent}>
      Draw
    </Button>
  )
}
