"use client";
import Image from "next/image";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { type z } from "zod";
import { Switch } from "./ui/switch";
import { createContactSchema } from "@/server/db/schema";
import { PhoneInput } from "./ui/phone-input";
import { FileUpload } from "./file-upload";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import { showErrorToast } from "@/lib/handle-error";
import { Card, CardContent } from "./ui/card";
import { useRouter } from "next/navigation";

const schema = createContactSchema.omit({
  id: true,
  image: true,
});

export const CreateContactDialog = (props: { partnerId: string }) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const { partnerId } = props;

  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "+12312313333",
      email: "",
      jobTitle: "",
      isPrimary: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      partnerId,
      notes: "",
    },
  });

  const { mutate: create } = api.contacts.create.useMutation({
    onSuccess: () => {
      toast.success("Contact created successfully");
      setImageUrl("");
      router.refresh();
      form.reset();
    },
    onError: (error) => {
      showErrorToast(error);
    },
  });

  const isValid = form.formState.isValid;

  function onSubmit(data: z.infer<typeof schema>) {
    create({
      ...data,
      image: imageUrl,
    });
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Add Contact
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          <DialogHeader>
            <DialogTitle>Create a new contact</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Contact Name" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>The name of the contact</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry={"US"}
                        initialValueFormat="national"
                        placeholder="+12312313333"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The phone number of the contact
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>The email of the contact</FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Job Title" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The job title of the contact
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="flex flex-row gap-6">
                <FormField
                  control={form.control}
                  name="isPrimary"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-start gap-1">
                      <FormLabel>Primary Contact</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Is this the primary contact?
                      </FormDescription>
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full pb-10">
                <FileUpload
                  onChange={(e) => {
                    if (e) {
                      setImageUrl(e);
                    }
                  }}
                  endpoint="courseImage"
                />
                {imageUrl !== "" && (
                  <Card>
                    <CardContent>
                      <Image
                        width={600}
                        height={300}
                        alt="nono"
                        src={imageUrl}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Notes about the contact"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Additional notes about the contact
                    </FormDescription>
                  </FormItem>
                )}
              />
              <Button disabled={!isValid && imageUrl !== ""} type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
