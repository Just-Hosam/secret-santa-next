interface Props {
  params: Promise<{ id: string }>
}

export default async function Event({ params }: Props) {
  const { id } = await params
  const event = await prisma?.event.findUnique({ where: { id } })

  return (
    <div>
      <h2>{event?.name}</h2>
      <p>{event?.description}</p>
    </div>
  )
}
