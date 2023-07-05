import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/Task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {

  @Output() onAddTask = new EventEmitter<Task>();
  taskForm!: FormGroup;
  showAddTask: boolean = false;
  subscription?: Subscription;

  constructor(private uiService: UiService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.subscription = this.uiService.onToggle()
      .subscribe((value) => this.showAddTask = value);

    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.maxLength(100)],
      deadlineDate: ['', [Validators.required, this.validateDeadlineDate]],
      deadlineTime: ['', [Validators.required, this.validateDeadlineTime]],
      reminder: [false]
    });
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      return;
    }

    const newTask: Task = {
      title: this.taskForm.value.title,
      description: this.taskForm.value.description,
      hasReminder: this.taskForm.value.reminder,
      isComplete: false,
      deadline: new Date(this.taskForm.value.deadlineDate + 'T' + this.taskForm.value.deadlineTime),
      createdAt: new Date()
    };

    this.onAddTask.emit(newTask);

    this.taskForm.reset();
  }

  validateDeadlineDate(control: FormControl) {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate < currentDate) {
      return { pastDate: true };
    }

    return null;
  }

  validateDeadlineTime(control: FormControl) {
    const selectedTime = new Date(control.value);
    const currentTime = new Date();

    if (selectedTime < currentTime) {
      return { pastTime: true };
    }

    return null;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
