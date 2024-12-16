import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth-options"
import prisma from "@/lib/prisma"
import { Event } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Events() {
  const session = await getServerSession(authOptions)
  const isNotAuthenticated = !session?.user

  if (isNotAuthenticated) redirect("/")

  const events =
    (await prisma?.event.findMany({
      where: {
        user: {
          email: session?.user?.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })) || []

  return (
    <div>
      <header className="flex justify-between items-center gap-4 pb-6 sticky top-[88px] bg-white">
        <h2 className="text-3xl">My Events</h2>
        <Link href="events/new">
          <Button size="icon">
            <PlusIcon />
          </Button>
        </Link>
      </header>
      <div>
        {events.length ? (
          events.map((event: Event) => (
            <Link href={`/events/${event.id}`} key={event.id}>
              <div className="border rounded-2xl p-4 mb-3">
                <h3 className="text-xl font-semibold">{event.name}</h3>
                {event?.description && (
                  <p className="whitespace-pre-line text-light text-sm mt-2">
                    {event.description}
                  </p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <div className="mt-10 flex flex-col items-center justify-center text-center">
            <Image
              src="/empty-mailbox.webp"
              alt="Empty Mailbox"
              width={160}
              height={160}
              className="mb-6"
            ></Image>
            <h3 className="font-semibold text-xl mb-2">No Events yet</h3>
            <p className="mb-6">Get started by creating an event.</p>
            <Link href="events/new">
              <Button>
                <PlusIcon />
                Create Event
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
