import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { MailOpenIcon, PhoneIcon, StickyNoteIcon } from "lucide-react"

export const ContactCardSkeleton = () => {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="bg-primary rounded-t-lg p-6 flex items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-muted-foreground" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="flex items-center gap-2">
          <MailOpenIcon className="w-5 h-5 text-muted-foreground" />
          <Skeleton className="h-4 w-40" />
        </div>
        <div className="flex items-center gap-2">
          <StickyNoteIcon className="w-5 h-5 text-muted-foreground" />
          <Skeleton className="h-4 w-4" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-24 w-full" />
      </CardFooter>
    </Card>
  )
}

