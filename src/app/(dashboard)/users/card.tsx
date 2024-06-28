"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CardContent, Card } from "@/components/ui/card";
import { getErrorMessage } from "@/lib/handle-error";
import React from "react";
import { toast } from "sonner";
import { updateUser } from "@/app/_components/actions";

export default function UserCard({
  user,
}: {
  user: {
    id: string;
    isAdmin: boolean;
    name: string | null;
    email: string;
    image: string | null;
  };
}) {
  const [isCreatePending, startCreateTransition] = React.useTransition();

  function onSubmit() {
    startCreateTransition(() => {
      toast.promise(
        updateUser({
          id: user.id,
          isAdmin: !user.isAdmin,
        }),
        {
          loading: "Upading partner...",
          success: () => {
            return "Partner updated";
          },
          error: (error) => {
            return getErrorMessage(error);
          },
        },
      );
    });
  }

  return (
    <Card
      key="1"
      className="mx-auto max-w-sm overflow-hidden rounded-lg shadow-lg transition-all duration-200 hover:shadow-xl"
    >
      <Image
        alt="Profile picture"
        className="w-full object-cover"
        height="320"
        src="/placeholder.jpg"
        style={{
          aspectRatio: "320/320",
          objectFit: "cover",
        }}
        width="320"
      />
      <CardContent className="p-4">
        <h2 className="text-2xl font-bold transition-all duration-200 hover:text-gray-700">
          {user.name}
        </h2>
        <h3 className="text-gray-500 transition-all duration-200 hover:text-gray-600">
          {user.email}
        </h3>
        <div className="mt-4 flex space-x-2">
          <Button
            onClick={onSubmit}
            disabled={isCreatePending}
            className="w-full transition-all duration-200 hover:bg-gray-700 hover:text-white"
            size="sm"
          >
            {user.isAdmin ? "Revoke" : "Approve"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
