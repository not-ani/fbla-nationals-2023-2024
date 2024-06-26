"use client";
import { partners } from "@/server/db/schema";
import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { updatePartner } from "@/components/table/lib/actions";
import {
  type UpdatePartnerSchemaFull,
  updatePartnerSchemaFull,
  type UpdatePartnerSchema,
} from "@/components/table/lib/validations";
import { type RouterOutputs } from "@/trpc/react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { CalendarIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface PageFormProps {
  partner: RouterOutputs["partnersRouter"]["byId"];
}

export function PartnerPageForm({ partner }: PageFormProps) {
  const [isUpdatePending, startUpdateTransition] = React.useTransition();
  const router = useRouter();

  const form = useForm<UpdatePartnerSchemaFull>({
    resolver: zodResolver(updatePartnerSchemaFull),
    defaultValues: {
      id: partner!.id,
      name: partner!.name!,
      status: partner!.status!,
      orgType: partner!.orgType,
      email: partner!.email,
      availableResources: partner!.availableResources!,
      lastInteraction: partner!.lastInteraction,
    },
  });

  const isValid = form.formState.isValid;

  function onSubmit(input: UpdatePartnerSchema) {
    startUpdateTransition(async () => {
      const { error } = await updatePartner({
        id: partner!.id,
        ...input,
      });

      if (error) {
        toast.error(error);
        return;
      }

      form.reset();
      toast.success("Partner Updated");
      router.refresh();
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Id</FormLabel>
              <FormControl>
                <Input
                  placeholder="askdieownvx23aslj"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                The unique identifier of this partner
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex flex-row items-center gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Do a kickflip"
                    className="resize-none "
                    {...field}
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The name of the partnered organization
                </FormDescription>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email@email.com" {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  The email of the partnered organization
                </FormDescription>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row items-center gap-3">
          <FormField
            control={form.control}
            name="orgType"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Organization Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {partners.orgType.enumValues.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="capitalize"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />

                <FormDescription>
                  The type of organization this partner is
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="capitalize">
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      {partners.status.enumValues.map((item) => (
                        <SelectItem
                          key={item}
                          value={item}
                          className="capitalize"
                        >
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
                <FormDescription>
                  The verification status of this partner
                </FormDescription>
              </FormItem>
            )}
          />
        </div>
        <div className="w-full">
          <FormField
            control={form.control}
            name="lastInteraction"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel>Last Interaction</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The last interaction with this partner
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="availableResources"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avaliable Resources</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Free tutoring for students
                      "
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Notes on what resources partners can provide
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isUpdatePending || !isValid}>
          {isUpdatePending && (
            <ReloadIcon
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Save
        </Button>
      </form>
    </Form>
  );
}
