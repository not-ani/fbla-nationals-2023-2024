import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MailOpenIcon, PhoneIcon, StickyNoteIcon } from "lucide-react"
import { db } from "@/server/db"
import { Textarea } from "./ui/textarea"

export default async function Component({
  id
}: {
  id: string
}) {

  const data = await db.query.contacts.findFirst({
    where: (contacts, { eq }) => eq(contacts.id, id)
  })

  if (!data) return <div className="flex flex-col items-center justify-center h-screen">
    <h4 className="text-4xl text-gray-500">
      No Contact Found - This is moost likely an issue with the wifi
    </h4>
  </div>

  const initials = data.name?.split(" ").map((n: string) => n[0]).join("")

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="bg-primary rounded-t-lg p-6 flex items-center gap-4">
        <Avatar className="border-2 border-primary-foreground">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="text-primary-foreground">
          <h3 className="text-xl font-semibold">{data.name}</h3>
          <p className="text-sm">{data.jobTitle}</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 grid gap-4">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-muted-foreground" />
          <p className="text-muted-foreground">{data.phone}</p>
        </div>
        <div className="flex items-center gap-2">
          <MailOpenIcon className="w-5 h-5 text-muted-foreground" />
          <p className="text-muted-foreground">{data.email}</p>
        </div>
        {
          data.isPrimary ? (
            <div className="flex items-center gap-2">
              <StickyNoteIcon className="w-5 h-5 text-muted-foreground" />
              <p className="text-muted-foreground">p</p>
            </div>
          ) : null
        }
      </CardContent>
      <CardFooter>
        <Textarea content={data.notes} disabled />
      </CardFooter>
    </Card>
  )
}
