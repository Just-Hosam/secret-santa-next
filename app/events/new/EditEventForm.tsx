"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Event } from "@prisma/client"
import { redirect } from "next/navigation"

interface Props {
  event?: Event
}

export default function EditEventForm({ event }: Props) {
  const isCreatingEvent = !event

  const updateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
    }

    if (!body.name) return

    const method = isCreatingEvent ? "POST" : "PUT"
    const endpoint = isCreatingEvent
      ? "/api/events"
      : `/api/events/${event?.id}`

    const res = await fetch(endpoint, {
      method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await res.json()

    redirect("/events")
  }

  return (
    <form onSubmit={updateEvent}>
      <label className="" htmlFor="name">
        Name
      </label>
      <Input
        className="mb-4 mt-1"
        type="text"
        name="name"
        placeholder="Enter the event's name here!"
        defaultValue={event?.name || ""}
      ></Input>
      <label htmlFor="description">Description</label>
      <Textarea
        className="mt-1 mb-6"
        name="description"
        placeholder="Enter the event's description here!"
        defaultValue={event?.description || ""}
      />
      <Button type="submit" className="w-full">
        {isCreatingEvent ? "Create" : "Edit"}
      </Button>
    </form>
  )
}
