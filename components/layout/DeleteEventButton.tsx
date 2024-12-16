"use client"

import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Props {
  eventId: string
}

export default function DeleteEventButton({ eventId }: Props) {
  const deleteEvent = async () => {
    await fetch(`/api/events`, {
      method: "DELETE",
      body: JSON.stringify({ eventId: eventId }),
    })

    toast.success("Event deleted!")

    redirect(`/events`)
  }

  return (
    <Button className="w-full" onClick={deleteEvent} variant="destructive">
      Delete
    </Button>
  )
}
