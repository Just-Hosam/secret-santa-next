import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const participantData = await req.json()

  const participant = await prisma?.participant.create({
    data: {
      name: participantData.name,
      email: participantData.email,
      description: participantData.description,
      event: {
        connect: {
          id: participantData.eventId,
        },
      },
    },
  })

  return NextResponse.json(participant)
}
