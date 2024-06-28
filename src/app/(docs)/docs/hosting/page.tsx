import Link from "next/link";

export default function Page() {
  return (
    <div className="w-full">
      <h2 className="mb-6 text-2xl font-bold">Database and Backup Options</h2>

      <p className="mb-4">
        The choice of your database solution significantly impacts your backup
        strategy. We offer two primary options:
      </p>

      <ol className="mb-6 list-decimal space-y-4 pl-6">
        <li>
          <strong>Supabase (Default Option):</strong> If you&apos;re using
          Supabase as your database provider, which is our recommended and
          default choice, we strongly advise referring to their official
          documentation for backup procedures. Supabase offers robust, built-in
          backup solutions tailored to their platform.
          <p className="mt-2">
            <Link
              href="https://supabase.com/docs/guides/platform/backups"
              className="text-blue-600 underline hover:text-blue-800"
            >
              Access Supabase Backup Documentation
            </Link>
          </p>
          <p className="mt-2">
            Note: Supabase credentials will be provided to you upon deployment
            of your application. These credentials are essential for managing
            your database, including backup operations.
          </p>
        </li>

        <li>
          <strong>Self-Hosted Database:</strong> If you&apos;ve opted to host
          your own database, please continue reading this documentation for
          detailed information on backup strategies and implementation. We
          provide comprehensive guidance for setting up and managing backups in
          self-hosted environments.
        </li>
      </ol>

      <p className="mt-4">
        Regardless of your chosen database solution, regular backups are crucial
        for data integrity and business continuity. Ensure you thoroughly
        understand and implement appropriate backup procedures for your specific
        setup.
      </p>
    </div>
  );
}
