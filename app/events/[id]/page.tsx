import { CopyLinkButton } from "@/components/layout/CopyLinkButton"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import prisma from "@/lib/prisma"
import { Participant } from "@prisma/client"
import {
  ArrowLeftIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  SendIcon,
  Trash2Icon,
} from "lucide-react"
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
      <div className="mb-6 flex items-center justify-between gap-4">
        <Link href="/events">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost">
                <EllipsisVerticalIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit">
              <div className="flex flex-col">
                <Link href={`/events/new/${id}`}>
                  <Button className="w-full justify-start" variant="ghost">
                    <PencilIcon />
                    Edit
                  </Button>
                </Link>
                <Link href={`/events/delete/${id}`}>
                  <Button className="w-full" variant="ghost">
                    <Trash2Icon />
                    Delete
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          <CopyLinkButton
            link={`${process.env.BASE_DOMAIN}/participant/${id}`}
          />
          <Link href={`/events/send/${id}`}>
            <Button className="ml-2">
              <SendIcon />
              Send
            </Button>
          </Link>
        </div>
      </div>
      <h2 className="text-3xl font-semibold mb-4">{event?.name}</h2>
      <p className="mb-10 whitespace-pre-line">{event?.description}</p>
      <h4 className="text-xl font-semibold">Participants</h4>
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
          <h3 className="text-2xl">{participant.name}</h3>
          <p className="italic text-gray-500 font-light text-xs text-[10px]">
            {participant.email}
          </p>
          {participant?.description && (
            <p className="mt-2 whitespace-pre-line">
              {participant.description}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
