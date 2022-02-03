import { Component, OnInit } from '@angular/core';
import { ITask, TaskState } from 'src/app/models/task';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { getTaskStateByDate } from 'src/app/helpers/getTaskStateByDate';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {

  taskList: ITask[] = [];
  inputTask: string = "";

  ngOnInit(): void {
    this.taskList = [
      {
        content: "Validate form input",
        description: "You can improve overall data quality by validating user input for accuracy and completeness. This page shows how to validate user input from the UI and display useful validation messages, in both reactive and template-driven forms.",
        isCompleted: true,
        isEditing: false,
        date: new Date(2022, 1, 1),
        id: "1",
        state: TaskState.Default
      },
      {
        content: "Cook diner",
        description: "Meet and potatoe",
        isCompleted: false,
        isEditing: false,
        date: new Date(2022, 1, 4),
        id: "2",
        state: TaskState.Default
      },
      {
        content: "Call Alex",
        description: "",
        isCompleted: false,
        isEditing: false,
        date: new Date(2022, 1, 6),
        id: "3",
        state: TaskState.Default
      },
      {
        content: "Buy apples",
        description: "",
        isCompleted: false,
        isEditing: false,
        id: "4",
        state: TaskState.Default
      },
      {
        content: "Every time the value of a form control changes, Angular runs validation and generates either a list of validation errors that results in an INVALID status, or null, which results in a VALID status.",
        description: "You can improve overall data quality by validating user input for accuracy and completeness. This page shows how to validate user input from the UI and display useful validation messages, in both reactive and template-driven forms.",
        isCompleted: true,
        isEditing: false,
        date: new Date(2022, 1, 1),
        id: "5",
        state: TaskState.Default
      },
    ]

    this.taskList = this.taskList.map(task => {
       task.state = getTaskStateByDate(task.date)
       return task;
    })
  }

  onDeleteTask(id: string) : void {
    this.taskList = this.taskList.filter(value => value.id !== id);
  }

  onAddTask(newTask: ITask) : void {
    this.taskList.push(newTask);
  }

  onEditTask(editedTask: ITask) : void {
    this.taskList = this.taskList.map(value => {
      if (value.id === editedTask.id) {
        return editedTask;
      }
      return value;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.taskList, event.previousIndex, event.currentIndex);
  }
}
