"use client"

import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"

interface Props {
  link: string
}

export function CopyLinkButton({ link }: Props) {
  const copyLink = () => {
    navigator.clipboard.writeText(link)
  }

  return (
    <Button variant="outline" size="icon" className="ml-2" onClick={copyLink}>
      <LinkIcon />
    </Button>
  )
}
