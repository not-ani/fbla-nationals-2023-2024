

#Partner Management System

## Overview

It's designed as a Partner Management System, allowing schools to manage and track business and community partners efficiently. It was used to secure 8th Place Internationally at the FBLA 2024 NLC in the event coding and programming.

## Technologies Used

This project leverages the power of the T3 Stack, which includes:

- [Next.js](https://nextjs.org) - React framework for building performant apps with the best developer experience
- [NextAuth.js](https://next-auth.js.org) - Flexible authentication for Next.js applications
- [Drizzle](https://orm.drizzle.team) - Lightweight and performant TypeScript ORM
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework for rapid UI development
- [tRPC](https://trpc.io) - End-to-end typesafe APIs made easy

## Features

- User Authentication: Secure login and registration system
- Partner Management: Add, edit, and delete partner information
- Partner Listing: View all partners with filtering and sorting options
- Partner Details: Comprehensive view of individual partner information
- User Roles: Admin and regular user roles with different permissions
- Responsive Design: Mobile-friendly interface for on-the-go access

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fbla-nationals-2023-2024.git
   ```

2. Install dependencies:
   ```
   cd fbla-nationals-2023-2024
   npm install
   ```

3. Set up your environment variables:
   Copy the `.env.example` file to `.env` and fill in the required variables.

4. Set up the database:
   ```
   pnpm db:push
   ```

5. Run the development server:
   ```
   pnpm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

- `src/app ` - Contains all the pages of the application
- `src/components` - Reusable React components
- `src/server` - Server-side code, including API routes and database queries, and db schema
- `src/styles` - Global styles and Tailwind CSS configuration

## Customization

This project is set up to be easily customizable. You can start by modifying the existing components and pages to fit your specific needs. As your project grows, you can add additional features and components as necessary.

## Deployment

This application can be easily deployed to platforms like Vercel or Netlify. Refer to their respective documentation for detailed deployment instructions.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Thanks to the creators and maintainers of the T3 Stack for providing an excellent starting point for modern web applications.
- Shoutout to the open-source community for the amazing tools and libraries used in this project.
