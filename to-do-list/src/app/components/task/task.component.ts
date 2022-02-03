import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ITask, TaskState } from 'src/app/models/task';
import { getTaskStateByDate } from 'src/app/helpers/getTaskStateByDate';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.less'],
  providers: [DatePipe]
})
export class TaskComponent implements OnInit {

  @Input() task!: ITask;
  @Output() isDeleted = new EventEmitter<string>();
  @Output() editTask = new EventEmitter<ITask>();
  taskName: string | undefined;
  taskDescription: string | undefined;
  taskDate: string | undefined;
  errorMessage: string | null = null;

  constructor(private datePipe: DatePipe) {

  }

  ngOnInit() : void {
    this.taskName = this.task.content;
    this.taskDescription = this.task.description;
    if (this.task.date) {
      const userTimeZoneInHours = this.task.date.getTimezoneOffset() / 60;
      const taskDateHours = this.task.date.getHours();

      this.task.date.setHours(taskDateHours + -userTimeZoneInHours);
      this.taskDate = this.task.date?.toISOString().slice(0, 10);
    } 
  }

  toggleDone() : void {
    this.task.isCompleted = !this.task.isCompleted;
  }

  deleteTask() : void {
    this.isDeleted.emit(this.task.id);
  }

  changeFields() : void {
    this.task.isEditing = !this.task.isEditing;
  }

  saveChanges() : void { 
    if (!this.taskName) {
      this.errorMessage = "You can't save task without name";
      return;
    }
    const taskDateValue = this.taskDate ? new Date(this.taskDate) : undefined;

    this.editTask.emit({
      content: this.taskName  || '',
      description: this.taskDescription || '',
      date: taskDateValue,
      isCompleted: this.task.isCompleted,
      isEditing: false,
      id: this.task.id,
      state: getTaskStateByDate(taskDateValue)
    });
    this.task.isEditing = false;
    this.errorMessage = null;
  }

  printData(date: Date | undefined) : string | null {
    return date ? this.datePipe.transform(date, "dd.MM.yyyy") : '';
  }


}
