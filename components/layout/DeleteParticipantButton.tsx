"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface Props {
  participantId: string
}

export default function DeleteParticipantButton({ participantId }: Props) {
  const router = useRouter()

  const deleteParticipant = async () => {
    await fetch(`/api/participant`, {
      method: "DELETE",
      body: JSON.stringify({ participantId }),
    })

    toast.success("Participant deleted!")

    router.refresh() // Refresh the current page
  }

  return (
    <Button onClick={deleteParticipant} variant="destructive">
      Delete
    </Button>
  )
}
