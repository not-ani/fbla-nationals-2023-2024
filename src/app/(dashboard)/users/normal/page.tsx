import { eq } from "drizzle-orm";
import React from "react";
import UserCard from "../card";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";

export default async function Page() {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      isAdmin: users.isAdmin,
      email: users.email,
      image: users.image,
    })
    .from(users)
    .where(eq(users.isAdmin, false));

  return (
    <div>
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-600">
          No Users
        </div>
      ) : null}
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        {data.map((user) => (
          <div className="col-span-1 row-span-1" key={user.id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
