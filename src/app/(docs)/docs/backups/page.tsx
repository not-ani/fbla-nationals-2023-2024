import { CodeBlock } from "@/components/chat/code-block";

export default function Page() {

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-6 ">Configuring the Database Backup Script</h2>
      <p className="mb-4">
        Our PostgreSQL backup script is designed to be flexible and easily configurable to meet your specific needs. Follow these steps to set up and customize your database backups:
      </p>

      <ol className="list-decimal pl-6 space-y-4 mb-6">
        <li>
          <strong>Install Required Software:</strong> Ensure you have Python and the PostgreSQL client tools (including pg_dump) installed on your system.
        </li>

        <li>
          <strong>Configure Database Connection:</strong> Update the following variables in the script to match your database configuration:
          <CodeBlock value={`
            DB_HOST = "localhost"
            DB_PORT = "5434"
            DB_NAME = "fblanats"
            DB_USER = "postgres"
            DB_PASSWORD = "123"
          `} language="python" />
        </li>

        <li>
          <strong>Set Backup Directory:</strong> Change the BACKUP_DIR variable to your desired backup location:
          <CodeBlock value={`
            BACKUP_DIR = "/path/to/backup/directory"
          `} language="python" />
        </li>

        <li>
          <strong>Customize Backup Filename:</strong> If needed, modify the backup filename format:
          <CodeBlock value={`
            backup_file = f"{BACKUP_DIR}/backup_{DB_NAME}_{timestamp}.sql"
          `} language="python" />
        </li>

        <li>
          <strong>Schedule Regular Backups:</strong> Use your system's task scheduler (e.g., cron for Linux/macOS, Task Scheduler for Windows) to run the script at regular intervals.
        </li>
      </ol>

      <h3 className="text-xl font-semibold mb-4">Additional Customization Options:</h3>

      <ul className="list-disc pl-6 space-y-2 mb-6">
        <li>
          <strong>Compression:</strong> Add compression to save disk space by modifying the pg_dump command:
          <CodeBlock value={`
            "pg_dump", "-Fc", # instead of "-Fp"
          `} language="python" />
        </li>
        <li>
          <strong>Retention Policy:</strong> Implement a retention policy by adding code to delete old backups:
          <CodeBlock value={`
            import os
            from datetime import datetime, timedelta

            # Delete backups older than 30 days
            retention_days = 30
            cutoff_date = datetime.now() - timedelta(days=retention_days)

            for filename in os.listdir(BACKUP_DIR):
                file_path = os.path.join(BACKUP_DIR, filename)
                file_mod_time = datetime.fromtimestamp(os.path.getmtime(file_path))
                if file_mod_time < cutoff_date:
                    os.remove(file_path)
          `} language="python" />
        </li>
      </ul>

      <p>
        Remember to test your backup script thoroughly and verify that you can successfully restore from the backups. Regularly check your backup logs to ensure the process is working as expected.
      </p>
    </div>
  );
}
