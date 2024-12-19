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
import {
  ArrowLeftIcon,
  CornerDownRightIcon,
  EllipsisVerticalIcon,
  Gift,
  InfoIcon,
  PencilIcon,
  Trash2Icon,
  UsersIcon,
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
    include: {
      assignedTo: {
        select: { name: true },
      },
    },
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
                {!event?.closed && (
                  <Link href={`/events/new/${id}`}>
                    <Button className="w-full justify-start" variant="ghost">
                      <PencilIcon />
                      Edit
                    </Button>
                  </Link>
                )}
                <Link href={`/events/delete/${id}`}>
                  <Button className="w-full" variant="ghost">
                    <Trash2Icon />
                    Delete
                  </Button>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
          {!event?.closed && (
            <CopyLinkButton
              link={`${process.env.BASE_DOMAIN}/participant/${id}`}
            />
          )}

          <Link hidden={event?.closed} href={`/events/draw/${id}`}>
            <Button className="ml-2">
              <Gift />
              Draw
            </Button>
          </Link>
        </div>
      </div>
      {event?.closed && (
        <div className="border-2 rounded-lg bg-gray-100 flex p-6 mb-6 border-gray-200 gap-3 text-sm">
          <InfoIcon size={32} />
          <div>
            <p className="text-base mb-3">
              This event is <strong>closed</strong>.
            </p>
            Names have been drawn and participants have been notified. You can
            no longer modify this event.
          </div>
        </div>
      )}
      <h2 className="text-3xl font-semibold mb-4">{event?.name}</h2>
      <p className="mb-10 whitespace-pre-line">{event?.description}</p>
      <div className="flex gap-3 items-center text-xl font-semibold">
        <UsersIcon />
        <h4 className="">Participants</h4>
      </div>
      {participants?.length ? (
        <Participants participants={participants} event={event} />
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
const Participants = ({
  participants,
  event,
}: {
  participants: any[]
  event: any
}) => {
  return (
    <div>
      {participants.map((participant) => (
        <div key={participant.id} className="mt-4 border p-5 mb-4 rounded-xl">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h3 className="text-2xl">{participant.name}</h3>
              <p className="italic text-gray-500 font-light text-xs text-[10px]">
                {participant.email}
              </p>
            </div>
            {!event?.closed && (
              <DeleteParticipant participantId={participant?.id} />
            )}
          </div>
          {participant?.description && (
            <p className="mt-4 whitespace-pre-line">
              {participant.description}
            </p>
          )}
          {event?.closed && (
            <div className="flex gap-2 mt-4 items-end text-lg">
              <CornerDownRightIcon
                className="text-gray-400 self-start"
                strokeWidth={1.5}
                size={35}
              />
              <p>{participant?.assignedTo?.name}</p>
            </div>
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
