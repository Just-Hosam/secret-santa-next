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

      <h2 className="text-3xl font-semibold mb-4">Finalize {event?.name}</h2>
      <p className="font-light">
        Closing an event will send emails to all participants with their secret
        santa pick. This will also prevent any further participations from being
        added.
      </p>
      <p className="mt-4 font-semibold">
        Are you sure you want to finalize this event?
      </p>
      <div className="mt-8 flex items-center gap-2">
        <Link className="w-full" href={`/events/${event?.id}`}>
          <Button className="w-full" variant="outline">
            Cancel
          </Button>
        </Link>
        <CloseEventButton />
      </div>
    </div>
  )
}
