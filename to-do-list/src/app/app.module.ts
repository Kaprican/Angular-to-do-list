import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskComponent } from './components/task/task.component';
import { TaskAdderComponent } from './components/task-adder/task-adder.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    TaskComponent,
    TaskAdderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
