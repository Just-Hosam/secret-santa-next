import ParticipantForm from "@/components/layout/ParticipantForm"
import prisma from "@/lib/prisma"

interface Props {
  params: Promise<{ eventId: string }>
}

export default async function ParticipantFormPage({ params }: Props) {
  const { eventId } = await params
  const event = await prisma?.event.findUnique({ where: { id: eventId } })

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-4">{event?.name}</h2>
      <p className="mb-6 whitespace-pre-line">{event?.description}</p>

      <ParticipantForm eventId={eventId} />
    </div>
  )
}
