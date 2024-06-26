import os
import subprocess
from datetime import datetime

# Configuration
DB_HOST = "localhost"
DB_PORT = "5434"
DB_NAME = "fblanats"
DB_USER = "postgres"
DB_PASSWORD = "123"
BACKUP_DIR = "/home/blue/fbla-bak"

# Ensure backup directory exists
os.makedirs(BACKUP_DIR, exist_ok=True)

# Generate backup filename
timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
backup_file = f"{BACKUP_DIR}/backup_{DB_NAME}_{timestamp}.sql"

# Construct the pg_dump command
cmd = [
    "pg_dump",
    f"-h{DB_HOST}",
    f"-p{DB_PORT}",
    f"-U{DB_USER}",
    "-Fp",  # Plain-text format
    "-f", backup_file,
    DB_NAME
]

# Set password as environment variable
env = os.environ.copy()
env["PGPASSWORD"] = DB_PASSWORD

# Execute the backup
try:
    subprocess.run(cmd, env=env, check=True)
    print(f"Backup completed successfully: {backup_file}")
except subprocess.CalledProcessError as e:
    print(f"Backup failed: {e}")
