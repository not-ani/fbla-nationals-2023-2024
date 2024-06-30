import { db } from "@/server/db";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { partners } from "@/server/db/schema";
import { count } from "drizzle-orm";

async function PartnerCount({
  nothing,
}: Readonly<{
  nothing: string | undefined;
}>) {
  console.log(nothing);
  const [data] = await db
    .select({
      count: count(),
    })
    .from(partners);

  return (
    <Card className="flex flex-col items-center justify-center">
      <CardHeader>
        <CardTitle>Partner Count</CardTitle>
      </CardHeader>
      <CardContent className="text-5xl text-gray-800">
        {data?.count}
      </CardContent>
    </Card>
  );
}

export default PartnerCount;
