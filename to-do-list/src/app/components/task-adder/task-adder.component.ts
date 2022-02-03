import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { getTaskStateByDate } from 'src/app/helpers/getTaskStateByDate';
import { ITask, TaskState } from 'src/app/models/task';

@Component({
  selector: 'app-task-adder',
  templateUrl: './task-adder.component.html',
  styleUrls: ['./task-adder.component.less']
})
export class TaskAdderComponent {

  @Output() taskAdded = new EventEmitter<ITask>();
  taskName: string = "";
  taskDescription: string = "";
  taskDate: string | undefined;
  errorMessage: string | null = null;


  addTask(): void {
    if (!this.taskName) {
      this.errorMessage = "Нельзя создать задачу без имени задачи"
      return;
    }

    const taskDateValue = this.taskDate ? new Date(this.taskDate) : undefined;
    this.taskAdded.emit(
      {
        content: this.taskName,
        description: this.taskDescription,
        date: this.taskDate ? new Date(this.taskDate) : undefined,
        isCompleted: false,
        isEditing: false,
        id: Date.now().toString(),
        state: getTaskStateByDate(taskDateValue)
      });

    this.taskName = "";
    this.taskDescription = "";
    this.taskDate = ""; 
    this.errorMessage = null;
  }

}
