import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type FAQObject = {
  question: string;
  answer: string;
  id: number;
}

const questions = [
  {
    question: "c"
  }
]

export default function Page() {
  return <div className="flex flex-col h-screen justify-center items-center">
    <Card>
      <CardHeader>
        <CardTitle>
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accor
      </CardContent>
    </Accor>
  </div>;
}
