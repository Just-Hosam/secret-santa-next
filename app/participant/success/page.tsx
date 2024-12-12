import { CircleCheckIcon } from "lucide-react"

export default async function ParticipantSuccess() {
  return (
    <div className="mt-28 my-auto flex flex-col items-center justify-center">
      <CircleCheckIcon size={150} strokeWidth={1} color="#028a00" />
      <h2 className="text-3xl font-semibold mt-8 mb-2">Submission Sent!</h2>
      <p>You can safely close this tab.</p>
    </div>
  )
}
