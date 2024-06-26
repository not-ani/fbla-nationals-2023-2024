"use client"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CardContent, Card } from "@/components/ui/card"
import { getErrorMessage } from "@/lib/handle-error";
import React from "react";
import { toast } from "sonner";
import { updateUser } from "@/app/_components/actions";

export default function UserCard({
  user
}: {
  user: {
    id: string,
    isAdmin: boolean,
    name: string | null,
    email: string,
    image: string | null,
  }
}) {
  const [isCreatePending, startCreateTransition] = React.useTransition();

  function onSubmit() {
    startCreateTransition(() => {
      toast.promise(updateUser({
        id: user.id,
        isAdmin: !(user.isAdmin),
      }), {
        loading: "Upading partner...",
        success: () => {
          return "Partner updated";
        },
        error: (error) => {
          return getErrorMessage(error);
        },
      });
    });
  }



  return (
    <Card
      key="1"
      className="rounded-lg overflow-hidden shadow-lg max-w-sm mx-auto hover:shadow-xl transition-all duration-200"
    >
      <Image
        alt="Profile picture"
        className="object-cover w-full"
        height="320"
        src="/placeholder.jpg"
        style={{
          aspectRatio: "320/320",
          objectFit: "cover",
        }}
        width="320"
      />
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold hover:text-gray-700 transition-all duration-200">{user.name}</h2>
        <h3 className="text-gray-500 hover:text-gray-600 transition-all duration-200">{user.email}</h3>
        <div className="flex mt-4 space-x-2">
          <Button onClick={onSubmit} disabled={isCreatePending} className="w-full hover:bg-gray-700 hover:text-white transition-all duration-200" size="sm" >
            {
              user.isAdmin ? (
                "Revoke"
              ) : (
                "Approve"
              )
            }
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
