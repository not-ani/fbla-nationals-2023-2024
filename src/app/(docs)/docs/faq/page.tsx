import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqs }) => {
  return (
    <div className="">
      <h2 className="mb-6 text-2xl font-bold">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// Example usage:
export default function FAQPage() {
  const faqData = [
    {
      question: "How is the data stored?",
      answer:
        "The data is stored in PostgreSQL to provide a persistent and seamless experience for the user.",
    },
    {
      question: "What data from the school is stored?",
      answer:
        "Only what we need for Google OAuth, which includes email address, full name, and profile picture.",
    },
    {
      question: "What practices are used to maintain code quality?",
      answer:
        "We use ESLint and Prettier to maintain code consistency and quality, along with using guidelines like conventional commits.",
    },
    {
      question: "What about accessibility?",
      answer:
        "Our components are built on top of Radix UI, which is highly accessible.",
    },
    {
      question: "What about database backups?",
      answer: `
There are 2 ways our databases are backed up.
Our database backup strategy encompasses two approaches depending on the environment. For local development, we employ a dynamic backup system utilizing a custom Python script, which can be configured as detailed in our documentation's backup section. In the production environment, we leverage Supabase as our database solution, taking advantage of their robust backup capabilities outlined in their comprehensive documentation. This dual strategy ensures data integrity and security across both development and production environments, providing a seamless experience for our users and developers alike

`,
    },
  ];
  return (
    <div>
      <FAQSection faqs={faqData} />
    </div>
  );
}
