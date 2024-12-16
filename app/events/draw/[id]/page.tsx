import CloseEventButton from "@/components/layout/CloseEventButton"
import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function CloseEvent({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id: id } })

  return (
    <div>
      <Link href={`/events/${event?.id}`}>
        <Button className="mb-3" variant="ghost" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <h2 className="text-3xl font-semibold mb-4">
        Draw Names for {event?.name}
      </h2>
      <p className="font-light">
        Drawing names will randomly assign each participant their secret gift
        recipient and notify them by email. Once names are drawn, no new
        participants can be added to this event.
      </p>
      <p className="mt-4 mb-8 font-semibold">
        Ready to draw names and start the gift exchange?
      </p>
      <CloseEventButton />
      <Link className="w-full " href={`/events/${event?.id}`}>
        <Button className="w-full mt-2" variant="ghost">
          Cancel
        </Button>
      </Link>
    </div>
  )
}
