import { Button } from "@/components/ui/button"
import { Participant } from "@prisma/client"
import { ArrowLeftIcon, EditIcon, PencilIcon, ShareIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Event({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id } })

  const participants = await prisma?.participant.findMany({
    where: { eventId: id },
  })

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-4">
        <Link href="/events">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <div>
          <Link href={`/events/new/${id}`}>
            <Button variant="ghost" size="icon">
              <PencilIcon />
            </Button>
          </Link>
          <Link href="/events">
            <Button className="ml-2" size="icon">
              <ShareIcon />
            </Button>
          </Link>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-4">{event?.name}</h2>
      <p className="mb-6">{event?.description}</p>

      {participants?.length ? (
        <Participants participants={participants} />
      ) : (
        <div>No participants yet</div>
      )}
    </div>
  )
}

// Participants list component
const Participants = ({ participants }: { participants: Participant[] }) => {
  return (
    <div>
      {participants.map((participant) => (
        <div key={participant.id} className="mt-4">
          <h3 className="text-xl font-semibold">{participant.name}</h3>
          <p>{participant.email}</p>
        </div>
      ))}
    </div>
  )
}
