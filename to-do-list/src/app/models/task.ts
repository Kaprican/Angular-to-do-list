export enum TaskState {
    Default = "Default",
    Upcoming = "Upcoming",
    Overdue = "Overdue"
}

export interface ITask {
    content: string;
    description: string;
    isCompleted: boolean;
    date?: Date;
    isEditing: boolean;
    id: string;
    state: TaskState;
}