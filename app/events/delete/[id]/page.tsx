import DeleteEventButton from "@/components/layout/DeleteEventButton"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditEvent({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id: id } })

  return (
    <div>
      <Link href={`/events/${event?.id}`}>
        <Button className="mb-3" variant="ghost" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <h2 className="text-3xl font-semibold mb-4">Delete {event?.name}</h2>
      <p className="font-light mb-8">
        Are you sure you want to delete this event? You will lose all
        participations
      </p>
      <DeleteEventButton eventId={event?.id || ""} />
      <Link className="w-full" href={`/events/${event?.id}`}>
        <Button className="w-full mt-2" variant="ghost">
          Cancel
        </Button>
      </Link>
    </div>
  )
}
