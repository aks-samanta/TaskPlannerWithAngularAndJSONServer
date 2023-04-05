import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs'
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {

  title: string = 'Task Planner';
  showAddTask: boolean = false;
  subscription?: Subscription;

  constructor(private uiService: UiService, private router: Router) {
    this.subscription = this.uiService.onToggle()
      .subscribe(Value => this.showAddTask = Value);
  }

  toggleAddTask(): void {
    this.uiService.toggelAddTask();
  }

  hasRoute(route: string): boolean {
    return this.router.url === route;
  }
}
