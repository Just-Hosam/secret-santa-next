"use client"

import { Button } from "@/components/ui/button"
import { LoaderCircleIcon } from "lucide-react"
import { redirect } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface Props {
  eventId: string
}

export default function CloseEventButton({ eventId }: Props) {
  const [loading, setLoading] = useState(false)

  const closeEvent = async () => {
    setLoading(true)

    await fetch("/api/send", {
      method: "POST",
      body: JSON.stringify({ eventId }),
    })

    toast.success("Names have been drawn and participants have been notified.")

    setLoading(false)

    redirect(`/events/${eventId}`)
  }

  return (
    <Button disabled={loading} className="w-full" onClick={closeEvent}>
      {loading ? (
        <>
          <LoaderCircleIcon className="animate-spin" /> Loading
        </>
      ) : (
        "Draw"
      )}
    </Button>
  )
}
