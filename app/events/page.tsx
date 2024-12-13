import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/auth-options"
import { Event } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function Events() {
  const session = await getServerSession(authOptions)
  const isNotAuthenticated = !session?.user

  if (isNotAuthenticated) redirect("/")

  const events = await fetch(`${process.env.BASE_DOMAIN}/api/events`).then(
    (res) => res.json()
  )

  return (
    <div>
      <header className="flex justify-between items-center gap-4 mb-5">
        <h2 className="text-3xl">My Events</h2>
        <Link href="events/new">
          <Button size="icon">
            <PlusIcon />
          </Button>
        </Link>
      </header>
      <div>
        {events.map((event: Event) => (
          <Link href={`/events/${event.id}`} key={event.id}>
            <div className="border rounded-2xl p-4 mb-3">
              <h3 className="text-xl font-semibold">{event.name}</h3>
              {event?.description && (
                <p className="text-light text-sm mt-2">{event.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
