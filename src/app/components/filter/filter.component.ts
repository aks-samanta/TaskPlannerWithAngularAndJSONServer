import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from 'src/app/Task';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  filteredTasks?: Task[];
  activeFilter?: string;
  
  @Input() allTasks?: Task[];
  @Output() onFilter: EventEmitter<Task[]> = new EventEmitter<Task[]>();

  filterTasks(filterType: string): void {
    switch (filterType) {
      case 'overdue':
        this.activeFilter = 'overdue';
        this.filteredTasks = this.allTasks?.filter(task => (new Date(task.deadline!) < new Date() && !task.isComplete));
        break;
      case 'pending':
        this.activeFilter = 'pending';
        this.filteredTasks = this.allTasks?.filter(task => (new Date(task.deadline!) >= new Date() && !task.isComplete));
        break;
      case 'completed':
        this.activeFilter = 'completed';
        this.filteredTasks = this.allTasks?.filter(task => task.isComplete);
        break;
      default:
        this.activeFilter = 'all';
        this.filteredTasks = this.allTasks;
        break;
    }

    this.onFilter.emit(this.filteredTasks);

  }

 
}
