import { type Partner } from "@/server/db/schema";
import {
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: Partner["status"]) {
  const statusIcons = {
    Verified: CheckCircledIcon,
    Pending: StopwatchIcon,
    Unverified: QuestionMarkCircledIcon,
  };

  return statusIcons[status!] || CircleIcon;
}
