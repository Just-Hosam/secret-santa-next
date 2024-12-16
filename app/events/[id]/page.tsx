import { CopyLinkButton } from "@/components/layout/CopyLinkButton"
import DeleteParticipantButton from "@/components/layout/DeleteParticipantButton"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
  Gift,
  PencilIcon,
  Trash2Icon,
} from "lucide-react"
import Image from "next/image"
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
      <div className="pb-6 flex items-center justify-between gap-4 sticky bg-white top-[88px]">
        <Link href="/events">
          <Button variant="ghost" size="icon">
            <ArrowLeftIcon />
          </Button>
        </Link>
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="icon" variant="ghost" className="mr-2">
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
          <Link href={`/events/draw/${id}`}>
            <Button className="ml-2">
              <Gift />
              Draw
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
        <div className="mt-10 flex flex-col items-center justify-center text-center">
          <Image
            src="/empty-mailbox.webp"
            alt="Empty Mailbox"
            width={160}
            height={160}
            className="mb-6"
          ></Image>
          <h3 className="font-semibold text-xl mb-2">No Participants yet</h3>
          <p className="mb-6">
            Get started by sharing this event with your participants.
          </p>
          <CopyLinkButton
            text="Copy Event Link"
            link={`${process.env.BASE_DOMAIN}/participant/${id}`}
          />
        </div>
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
          <div className="flex justify-between items-start gap-6">
            <div>
              <h3 className="text-2xl">{participant.name}</h3>
              <p className="italic text-gray-500 font-light text-xs text-[10px]">
                {participant.email}
              </p>
            </div>
            <DeleteParticipant participantId={participant?.id} />
          </div>
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

const DeleteParticipant = ({ participantId }: { participantId: string }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Trash2Icon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Delete Participant</DrawerTitle>
          <DrawerDescription>
            Are you sure you want to delete this participant?
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DeleteParticipantButton participantId={participantId} />
          <DrawerClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
