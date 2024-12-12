import { Button } from "@/components/ui/button"
import { Event } from "@prisma/client"
import { PlusIcon } from "lucide-react"
import { getServerSession } from "next-auth"
import Link from "next/link"
import { redirect } from "next/navigation"
import { authOptions } from "../api/auth/[...nextauth]/route"

export default async function Events() {
  const session = await getServerSession(authOptions)
  const isNotAuthenticated = !session?.user

  if (isNotAuthenticated) redirect("/")

  const events = await fetch("http://localhost:3000/api/events").then((res) =>
    res.json()
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
            <div className="border border-gray-400 rounded-2xl p-4 mb-3">
              <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
              <p className="text-light text-sm">{event.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
