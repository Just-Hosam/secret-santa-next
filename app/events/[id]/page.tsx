import { CopyLinkButton } from "@/components/layout/CopyLinkButton"
import { Button } from "@/components/ui/button"
import { Participant } from "@prisma/client"
import { ArrowLeftIcon, PencilIcon } from "lucide-react"
import Link from "next/link"

interface Props {
  params: Promise<{ id: string }>
}

export default async function Event({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id } })

  const participants = await prisma?.participant.findMany({
    where: { eventId: id },
    orderBy: { createdAt: "desc" },
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
          <CopyLinkButton link={`http://localhost:3000/participant/${id}`} />
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-4">{event?.name}</h2>
      <p className="mb-8">{event?.description}</p>
      <h4 className="text-lg font-semibold">Participants</h4>
      {participants?.length ? (
        <Participants participants={participants} />
      ) : (
        <div className="mt-2">No participants yet</div>
      )}
    </div>
  )
}

// Participants list component
const Participants = ({ participants }: { participants: Participant[] }) => {
  return (
    <div>
      {participants.map((participant) => (
        <div key={participant.id} className="mt-4 border-b pb-4 mb-4">
          <h3 className="text-2xl font-semibold">{participant.name}</h3>
          <p className="italic font-light text-[12px]">{participant.email}</p>
          {participant?.description && (
            <p className="mt-2">{participant.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
