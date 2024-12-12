import { ArrowLeftIcon } from "lucide-react"
import EditEventForm from "./EditEventForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Event } from "@prisma/client"

interface Props {
  params: Promise<{ id: string }>
}

export default async function NewEvent({ params }: Props) {
  const { id } = await params
  let event: Event | null = null

  if (id) {
    event = (await prisma?.event.findUnique({ where: { id: id } })) || null
  }

  return (
    <div>
      <Link href="/events">
        <Button className="mb-3" variant="ghost" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <EditEventForm event={event} />
    </div>
  )
}
