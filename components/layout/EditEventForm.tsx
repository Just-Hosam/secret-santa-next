"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Event } from "@prisma/client"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Props {
  event?: Event | null
}

export default function EditEventForm({ event }: Props) {
  const isCreatingEvent = !event

  const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
      id: "",
    }

    if (!body.name) return
    if (!isCreatingEvent) body.id = event?.id

    const method = isCreatingEvent ? "POST" : "PUT"

    const res = await fetch("/api/events", {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await res.json()

    // toast("Event saved!")
    // Success toast
    toast.success("Event saved!")

    isCreatingEvent ? redirect("/events") : redirect(`/events/${event?.id}`)
  }

  return (
    <form onSubmit={updateEvent}>
      <label className="font-semibold" htmlFor="name">
        Name *
      </label>
      <Input
        className="mb-4 mt-1"
        type="text"
        name="name"
        placeholder="Enter the event's name here!"
        defaultValue={event?.name || ""}
        required
      ></Input>
      <label className="font-semibold" htmlFor="description">
        Description
      </label>
      <Textarea
        className="mt-1 mb-6 min-h-[250px]"
        name="description"
        placeholder="Enter the event's description here!"
        defaultValue={event?.description || ""}
      />
      <Button type="submit" className="w-full">
        Save
      </Button>
    </form>
  )
}
