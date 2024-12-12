import { Button } from "@/components/ui/button"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import EditEventForm from "../../../components/layout/EditEventForm"

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
