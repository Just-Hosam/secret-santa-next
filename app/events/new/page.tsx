import { ArrowLeftIcon } from "lucide-react"
import EditEventForm from "./EditEventForm"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function NewEvent() {
  return (
    <div>
      <Link href="/events">
        <Button className="mb-3" variant="ghost" size="icon">
          <ArrowLeftIcon />
        </Button>
      </Link>

      <EditEventForm />
    </div>
  )
}
