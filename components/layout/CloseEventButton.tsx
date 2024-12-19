"use client"

import { Button } from "@/components/ui/button"

interface Props {
  eventId: string
}

export default function CloseEventButton({ eventId }: Props) {
  const closeEvent = async () => {
    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ eventId }),
    })
  }

  return (
    <Button className="w-full" onClick={closeEvent}>
      Draw
    </Button>
  )
}
