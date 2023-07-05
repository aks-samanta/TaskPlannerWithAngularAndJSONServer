
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  taskForm!: FormGroup;
  @Input() taskToBeEdited!: Task;
  // deafultDeadlineDate:Date;

  @Output() taskEdited = new EventEmitter<Task>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const x = this.taskToBeEdited.deadline ? this.taskToBeEdited.deadline : ""
    this.taskForm = this.formBuilder.group({
      id: [{ value: this.taskToBeEdited.id, disabled: true }],
      title: [this.taskToBeEdited.title, Validators.required],
      description: [this.taskToBeEdited.description, Validators.required],
      hasReminder: this.taskToBeEdited.hasReminder,
      isComplete: this.taskToBeEdited.isComplete,
      deadlineDate: [new Date(x), [Validators.required, this.validateDeadlineDate]],
      deadlineTime: [new Date(x), [Validators.required, this.validateDeadlineTime]]
    });

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


  onSubmit() {
    if (this.taskForm.valid) {
      const editedTask: Task = {
        id: this.taskToBeEdited.id,
        title: this.taskForm.value.title,
        description: this.taskForm.value.description,
        hasReminder: this.taskForm.value.hasReminder,
        isComplete: this.taskForm.value.isComplete,
        deadline: new Date(this.taskForm.value.deadlineDate + 'T' + this.taskForm.value.deadlineTime),
        createdAt: new Date()
      };
      console.log(editedTask);
      this.taskEdited.emit(editedTask);

    }
  }
}
