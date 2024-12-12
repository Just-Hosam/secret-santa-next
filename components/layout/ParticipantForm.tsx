"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  eventId: string
}

export default function ParticipantForm({ eventId }: Props) {
  const submitParticipant = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      description: formData.get("description"),
      eventId,
    }

    const res = await fetch("/api/participant", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })

    await res.json()
  }

  return (
    <form onSubmit={submitParticipant}>
      <label className="font-semibold" htmlFor="name">
        Name *
      </label>
      <Input
        className="mb-4 mt-1"
        type="text"
        name="name"
        placeholder="e.g. John Doe"
        required
      ></Input>
      <label className="font-semibold" htmlFor="email">
        Email *
      </label>
      <Input
        className="mb-4 mt-1"
        type="email"
        name="email"
        placeholder="e.g. j_doe@gmail.com"
        required
      ></Input>
      <label className="font-semibold" htmlFor="description">
        Description
      </label>
      <Textarea
        className="mt-1 mb-6 min-h-[250px]"
        name="description"
        placeholder="Enter the gifts you'd like!"
      />
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}
