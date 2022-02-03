import { TaskState } from "../models/task";


export function getTaskStateByDate(date: Date | undefined ) : TaskState {
    if (!date) {
      return TaskState.Default;
    }

    let deadlineDate = getTaskDeadlineDate(date);
    let msBeforeDeadline = deadlineDate.getTime() - Date.now();
    let threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

    if (msBeforeDeadline < 0) {
      return TaskState.Overdue;
    }

    if (msBeforeDeadline < threeDaysInMs) {
      return TaskState.Upcoming;
    }

    return TaskState.Default;
  }

/**
 * Возвращает момент, когда задача начнет считаться просроченной
 * @param taskDate 
 * @returns 
 */
function getTaskDeadlineDate (taskDate: Date) : Date {
  const [ year, month, day ] = [taskDate.getFullYear(), taskDate.getMonth(), taskDate.getDate()];
  return new Date(year, month, day + 1);
}
  