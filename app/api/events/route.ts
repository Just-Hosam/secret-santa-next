import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const events = await prisma?.event.findMany({
    where: {
      user: {
        email: currentUserEmail,
      },
    },
  })

  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const eventData = await req.json()

  const currentUserId = await prisma?.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const event = await prisma?.event.create({
    data: {
      ...eventData,
      userId: currentUserId,
    },
  })

  return NextResponse.json(event)
}
