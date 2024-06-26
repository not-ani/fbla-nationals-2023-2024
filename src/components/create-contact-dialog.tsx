"use client";
import React from "react";
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

const schema = createContactSchema.omit({
  id: true,
});

export const CreateContactDialog = (props: { partnerId: string }) => {
  const { partnerId } = props;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      id: "",
      name: "",
      phone: "+12312313333",
      image: "/placeholder.png",
      email: "",
      jobTitle: "",
      isPrimary: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      partnerId,
      notes: "",
    },
  });

  const isValid = form.formState.isValid;

  function onSubmit(data: z.infer<typeof schema>) {
    // Replace with your actual submission logic
    console.log("Form Submitted", data);
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Add Contact
          </Button>
        </DialogTrigger>
        <DialogContent>
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
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image URL</FormLabel>
                    <FormControl>
                      <Input placeholder="/placeholder.png" {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The image URL of the contact
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
              <FormField
                control={form.control}
                name="isPrimary"
                render={({ field }) => (
                  <FormItem>
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
              <Button disabled={!isValid} type="submit">
                Save
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
