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
  task = {
    name: '',
    description: '',
    date: null
  }
  errorMessage: string | null = null;


  addTask(): void {
    if (!this.task.name) {
      this.errorMessage = "You can't create a task without a name"
      return;
    }

    const taskDateValue = this.task.date ? new Date(this.task.date) : undefined;
    this.taskAdded.emit(
      {
        content: this.task.name,
        description: this.task.description,
        date: this.task.date ? new Date(this.task.date) : undefined,
        isCompleted: false,
        isEditing: false,
        id: Date.now().toString(),
        state: getTaskStateByDate(taskDateValue)
      });

    this.task = {
      name: '',
      description: '',
      date: null
    }
    this.errorMessage = null;
  }

}
