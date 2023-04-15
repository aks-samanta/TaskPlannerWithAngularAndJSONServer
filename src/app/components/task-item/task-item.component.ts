import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task!: Task;
  @Output() onDeleteTask: EventEmitter<any> = new EventEmitter();
  @Output() onToggleReminder: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() onMarkedAsDone: EventEmitter<Task> = new EventEmitter;
  faTimes = faTimes;

  onDelete(task:Task): void {
    var result = confirm("Are you sure you want to delete this item?");
    if (result) {
      this.onDeleteTask.emit(task);
      console.log(task)
    }
  }

  onToggle(task: Task): void {
    this.onToggleReminder.emit(task);
  }

  onMarkAsDone(task:Task): void {  
    this.onMarkedAsDone.emit(task); 
  }
}
