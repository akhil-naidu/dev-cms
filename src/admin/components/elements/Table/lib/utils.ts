import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from '@radix-ui/react-icons'

import { Doc } from '@/convex/_generated/dataModel'

/**
 * Returns the appropriate status icon based on the provided status.
 * @param status - The status of the task.
 * @returns A React component representing the status icon.
 */
export function getStatusIcon(status: Doc<'task'>['status']) {
  const statusIcons = {
    canceled: CrossCircledIcon,
    backlog: ArrowDownIcon, // Example icon, you can replace it with the appropriate one
    todo: QuestionMarkCircledIcon,
    'in-progress': StopwatchIcon,
    done: CheckCircledIcon,
  }

  return statusIcons[status] || CircleIcon
}

/**
 * Returns the appropriate priority icon based on the provided priority.
 * @param priority - The priority of the task.
 * @returns A React component representing the priority icon.
 */
export function getPriorityIcon(priority: Doc<'task'>['priority']) {
  const priorityIcons = {
    low: ArrowDownIcon,
    medium: ArrowRightIcon,
    high: ArrowUpIcon,
  }

  // skipcq: JS-0339
  return priorityIcons[priority!] || CircleIcon
}
