"use client"

import { Button } from "@/components/ui/button"
import { CircleCheckBigIcon, LinkIcon, ShareIcon } from "lucide-react"
import React from "react"

interface Props {
  link: string
}

export function CopyLinkButton({ link }: Props) {
  const [copied, setCopied] = React.useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(link)

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" className="ml-2" onClick={copyLink}>
      {copied ? (
        <>
          <CircleCheckBigIcon strokeWidth={2.5} color="green" /> Copied
        </>
      ) : (
        <>
          <LinkIcon /> Copy
        </>
      )}
    </Button>
  )
}
