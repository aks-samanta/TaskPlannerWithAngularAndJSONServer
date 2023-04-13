import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})

export class TasksComponent {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  constructor(private taskService: TaskService, private router : Router) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe({
          next: (data) => {
            this.tasks = data;
            this.filteredTasks = data;
          },
          error: (error) => { 
            console.log(error);
            if(error.status == 401){
            alert("Please Login To Continue !!");
              this.router.navigate(['/login']);
            }
          }
        })
  }

  deleteTask(task: Task): void {
    this.taskService.deleteTask(task)
      .subscribe(
        () => this.tasks = this.tasks.filter(
          t => t.id !== task.id));
  }

  toggleReminder(task: Task): void {
    task.hasReminder = !task.hasReminder;
    this.taskService.updateReminder(task).subscribe((task) => {
      if (!task.hasReminder) alert("Reminder Removed !!");
      else if (task.hasReminder) alert("Reminder Added !!");
    });
  }

  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }

  displayFilteredTasks(filteredTasks:Task[]){
    this.filteredTasks = filteredTasks;
  }

}
