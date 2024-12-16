"use client"

import { Button } from "@/components/ui/button"
import { CircleCheckBigIcon, LinkIcon, ShareIcon } from "lucide-react"
import React from "react"

interface Props {
  link: string
  text?: string
}

export function CopyLinkButton({ link, text }: Props) {
  const [copied, setCopied] = React.useState(false)

  const copyLink = () => {
    navigator.clipboard.writeText(link)

    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" onClick={copyLink}>
      {copied ? (
        <>
          <CircleCheckBigIcon strokeWidth={2.5} color="green" /> Copied
        </>
      ) : (
        <>
          <LinkIcon /> {text || "Copy"}
        </>
      )}
    </Button>
  )
}
