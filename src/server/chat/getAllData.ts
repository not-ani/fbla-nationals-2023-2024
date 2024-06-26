import "server-only"
import { cache } from "react"
import { db } from "@/server/db"


export const getAllData = cache(async () => {
  const data = await db.query.partners.findMany({
    with: {
      contacts: true
    }
  })
  return data
})
