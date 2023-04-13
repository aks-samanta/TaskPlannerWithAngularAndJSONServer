import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  providers: [
    DatePipe // Add DatePipe to the providers array
  ]
})
export class AddTaskComponent {

  @Output() onAddTask = new EventEmitter<Task>();
  title?: string;
  description?: string;
  reminder: boolean = false;
  showAddTask: boolean = false;
  subscription?: Subscription;
  deadlineDate?: Date;
  deadlineTime?: string;

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle()
      .subscribe((value) => this.showAddTask = value)
  }

  onSubmit() {
    if (!this.title) {
      alert('Please Add a Task!');
      return;
    }
    if (!this.description) {
      alert('Please Add Desciption/Details!');
      return;
    }
    if (!this.deadlineDate) {
      alert('Please select a Date!');
      return;
    }
    if (!this.deadlineTime) {
      alert('Please select a Time!');
      return;
    }

    const newTask: Task = {
      title:this.title,
      description: this.description,
      hasReminder:this.reminder,
      isComplete:false,
      deadline: new Date(this.deadlineDate + 'T' + this.deadlineTime),
      createdAt: new Date()
    }

    this.onAddTask.emit(newTask);

    this.title = '',
      this.description = '',
      this.reminder = false;
    this.deadlineDate = new Date();
    this.deadlineTime='';
  }
}
