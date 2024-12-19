import prisma from "@/lib/prisma"

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(req: Request) {
  try {
    const { eventId } = await req.json()

    // Fetch participants
    const participants = await prisma.participant.findMany({
      where: { eventId },
    })

    if (participants.length < 2) {
      return Response.json(
        { error: "Need at least 2 participants" },
        { status: 400 }
      )
    }

    // Improved shuffle with derangement check
    let shuffled
    do {
      shuffled = [...participants].sort(() => 0.5 - Math.random())
    } while (!isValidDerangement(participants, shuffled))

    // Create assignments in transaction
    await prisma.$transaction(
      shuffled.map((receiver, i) => {
        const giver = participants[i]
        return prisma.participant.update({
          where: { id: giver.id },
          data: { assignedTo: { connect: { id: receiver.id } } },
        })
      })
    )

    // Update event status
    await prisma.event.update({
      where: { id: eventId },
      data: { closed: true },
    })

    let timeout = 0

    participants.forEach(async (participant, i) => {
      const receiver = shuffled[i]

      setTimeout(async () => {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Secret Santa <no-reply@samdahrooge.com>",
            to: [participant.email],
            subject: "Your Secret Santa Assignment",
            html: `
              <h2>Hi ${participant.name},</h2>
              <p>You will be the Secret Santa for <strong>${receiver.name}</strong>.</p>
              <p>Description:</p>
              <p style="white-space: pre-line;">${receiver.description}</p>
              <p>Happy gifting!</p>
            `,
          }),
        })
      }, timeout)

      timeout += 1000
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error(error)
    return Response.json(
      { error: "Failed to create assignments" },
      { status: 500 }
    )
  }
}

function isValidDerangement(original: any[], shuffled: any[]): boolean {
  return shuffled.every((item, i) => item.id !== original[i].id)
}
