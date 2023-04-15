import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  isSorted: boolean = false;
  
  @Output() onSort: EventEmitter<Task[]> = new EventEmitter<Task[]>();
  @Input() filteredTasks: Task[] = [];

  ngOnInit() {
    this.isSorted ? this.urgentLastSort() : this.urgentFirstSort();
  }
  ngOnChanges(){
    this.ngOnInit();
  }

  urgentFirstSort(): void {
    this.filteredTasks = this.filteredTasks?.sort((a, b) => {
     const now = new Date().getTime();
     const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
     const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;

     return deadlineA - now - (deadlineB - now);

   })
   this.isSorted = !this.isSorted;
   this.onSort.emit(this.filteredTasks);
 }

 urgentLastSort(): void {
    this.filteredTasks = this.filteredTasks?.sort((a, b) => {
     const now = new Date().getTime();
     const deadlineA = a.deadline ? new Date(a.deadline).getTime() : Number.POSITIVE_INFINITY;
     const deadlineB = b.deadline ? new Date(b.deadline).getTime() : Number.POSITIVE_INFINITY;

     return deadlineB - now - (deadlineA - now);

   })
   this.isSorted = !this.isSorted;
   this.onSort.emit(this.filteredTasks);
 }
}
