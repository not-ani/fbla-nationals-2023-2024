import { eq } from "drizzle-orm"
import UserCard from "../card"
import { db } from "@/server/db"
import { users } from "@/server/db/schema"

export default async function Page() {
  const data = await db.select({
    id: users.id,
    name: users.name,
    email: users.email,
    isAdmin: users.isAdmin,
    image: users.image,
  }).from(users).where(eq(users.isAdmin, true))

  return (
    <div>
      {data.length === 0 ? <div className="flex flex-col justify-center items-center text-gray-600">No Users</div> : null}
      <div className='grid grid-cols-3 grid-rows-2 gap-2'>
        {
          data.map((user) => (
            <div className="col-span-1 row-span-1" key={user.id} >
              <UserCard user={user} key={user.id} />
            </div>
          ))
        }
      </div>
    </div>
  )
}
