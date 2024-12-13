import { Button } from "@/components/ui/button"
import prisma from "@/lib/prisma"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import EditEventForm from "../../../../components/layout/EditEventForm"

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditEvent({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id: id } })

  return (
    <div>
      <Link href={`/events/${id}`}>
        <Button className="mb-3" variant="ghost" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <EditEventForm event={event} />
    </div>
  )
}
