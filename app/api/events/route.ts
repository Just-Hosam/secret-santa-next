import { authOptions } from "@/lib/auth-options"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const currentUserEmail = session?.user?.email!

  const eventData = await req.json()

  const currentUserId = await prisma?.user
    .findUnique({ where: { email: currentUserEmail } })
    .then((user) => user?.id!)

  const event = await prisma?.event.create({
    data: {
      name: eventData.name,
      description: eventData.description,
      user: {
        connect: {
          id: currentUserId,
        },
      },
    },
  })

  return NextResponse.json(event)
}

export async function PUT(req: Request) {
  const eventData = await req.json()

  const event = await prisma?.event.update({
    where: { id: eventData.id },
    data: {
      name: eventData.name,
      description: eventData.description,
    },
  })

  return NextResponse.json(event)
}

export async function DELETE(req: Request) {
  const eventData = await req.json()

  const event = await prisma?.event.delete({
    where: { id: eventData.eventId },
  })

  return NextResponse.json(event)
}
