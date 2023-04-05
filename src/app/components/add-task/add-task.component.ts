import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @Output() onAddTask = new EventEmitter<Task>();
  text?:string;
  day?:string;
  reminder:boolean = false;
  showAddTask : boolean = false;
  subscription?: Subscription;

  constructor(private uiService: UiService){
    this.subscription = this.uiService.onToggle()
                            .subscribe((value) => this.showAddTask = value)
  }

  onSubmit(){
    if(!this.text) {
      alert('Please Add a Task!');
      return;
    }
    if(!this.day) {
      alert('Please Add Day & Time!');
      return;
    }

    const newTask:Task={
      text: this.text,
      day: this.day,
      reminder: this.reminder,
      markedAsDone: false
    }

    this.onAddTask.emit(newTask);

    this.text='',
    this.day='',
    this.reminder=false;

  }
}
