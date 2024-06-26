import { ScrollArea } from '@/components/ui/scroll-area'
import React from 'react'

export default function Page() {
  return (
    <ScrollArea>
      <div className="">
        <h1 className="text-3xl font-bold mb-6">CTE Partner Database - User Documentation</h1>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="mb-4">
            Welcome to the Career and Technical Education (CTE) Partner Database application! This powerful tool is designed to help your school&apos;s CTE Department efficiently manage and utilize information about business and community partners. Our user-friendly interface allows you to store, search, and filter valuable data about organizations that support your CTE programs.
          </p>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Key Features</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Partner Information Storage:</strong> Easily input and store comprehensive details about your business and community partners, including organization name, type of organization, available resources, and contact information for key individuals.</li>
            <li><strong>Robust Search Functionality:</strong> Quickly find the information you need with our advanced search and filter options.</li>
            <li><strong>User-Friendly Interface:</strong> Navigate the application effortlessly with our intuitive design, built using Next.js for a smooth and responsive experience.</li>
            <li><strong>Secure Data Management:</strong> Your partner information is safely stored in a PostgreSQL database, ensuring data integrity and reliability.</li>
            <li><strong>Customizable Reports:</strong> Generate tailored reports to gain insights into your partnerships and resources.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Getting Started</h3>
          <p className="mb-4">To begin using the CTE Partner Database, you&apos;ll need to:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Log in to the application using your provided credentials.</li>
            <li>Familiarize yourself with the main dashboard and navigation menu.</li>
            <li>Start by adding your first partner or exploring the existing database.</li>
          </ol>
        </section>

        <p className="mt-6">
          The following sections of this documentation will guide you through each feature of the application, providing step-by-step instructions and helpful tips to maximize your experience.
        </p>

        <p className="mt-4">
          We&apos;re confident that this tool will streamline your partner management process and enhance the capabilities of your CTE programs. Should you have any questions or need assistance, please don&apos;t hesitate to reach out to our support team.
        </p>

        <p className="mt-4 font-semibold">
          Let&apos;s get started on organizing and leveraging your valuable partnerships!
        </p>
      </div>
    </ScrollArea>
  )
}

