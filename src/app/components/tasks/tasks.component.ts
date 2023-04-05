import { Component } from '@angular/core';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(data => this.tasks = data);
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task)
      .subscribe(
        () => this.tasks = this.tasks.filter(
          t => t.id !== task.id));
  }

  toggleReminder(task: Task): void {
    task.reminder = !task.reminder;
    this.taskService.updateReminder(task).subscribe(); 
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
