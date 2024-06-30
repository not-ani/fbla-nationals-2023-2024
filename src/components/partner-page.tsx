import React from "react";
import { api } from "@/trpc/server";
import { PartnerPageForm } from "@/components/partner-page.form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { BuildingIcon, PencilIcon } from "lucide-react";
import { CreateContactDialog } from "./create-contact-dialog";
import { InteractionHistoryWithoutFetch } from "./interaction-history";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export async function PartnerPage(props: { id: string }) {
  const { id } = props;
  const partner = await api.partnersRouter.byId({
    id: id,
  });

  if (!partner) {
    return null;
  }
  const contacts = partner.contacts;

  return (
    <Card className="container mx-auto my-8 h-[850px] w-[1000px] items-start overflow-y-scroll px-4 md:px-6 lg:px-8">
      <CardContent className="grid gap-8">
        <div className="flex flex-col">
          <div>
            <CardHeader className="items-start">
              <div className="flex flex-row items-start">
                <BuildingIcon className="h-11 w-20 text-gray-500 dark:text-gray-400" />
                <h1 className="text-5xl font-bold">Partner</h1>
              </div>
            </CardHeader>
            <CardContent>
              <PartnerPageForm partner={partner} />
            </CardContent>
          </div>
          <Tabs>
            <TabsList className="py-5" defaultValue="contacts">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="interactions">Interactions</TabsTrigger>
            </TabsList>
            <TabsContent value="interactions">
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Interactions</CardTitle>
                </CardHeader>
                <CardContent>
                  <InteractionHistoryWithoutFetch
                    interactions={partner.interactions}
                  />
                </CardContent>
              </div>
            </TabsContent>
            <TabsContent value="contacts">
              <div className="col-span-1 md:col-span-2 lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Contacts</CardTitle>
                  <CreateContactDialog partnerId={partner.id} />
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contacts.length === 0 && (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="text-center text-gray-500"
                          >
                            No contacts found
                          </TableCell>
                        </TableRow>
                      )}
                      {contacts.map((contact) => {
                        const initials = contact?.name
                          ?.split(" ")
                          .map((name) => name[0])
                          .join("");
                        return (
                          <TableRow key={contact.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={contact.image} />
                                  <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">
                                    {contact.name}
                                  </div>
                                  <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {contact.jobTitle}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.jobTitle}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                              <Button variant="outline" size="icon">
                                <PencilIcon className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </CardContent>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  );
}
