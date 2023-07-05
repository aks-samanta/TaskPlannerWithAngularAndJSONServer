import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from './services/ui.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = "Task Planner";
  isLoggedIn?: boolean;
  loggedInUser!: User;
  isLoggedInSubscription?: Subscription;

  constructor(private router: Router, private uiService: UiService) { }


  ngOnInit() {
    this.isLoggedInSubscription = this.uiService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
      const loggedInUserDetails = sessionStorage.getItem('loggedInUserDetails');
      this.loggedInUser = loggedInUserDetails ? JSON.parse(loggedInUserDetails) : {};

    });

    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") == 'true';

  }



  logout() {

    if (confirm("Are you sure you want to logout?")) {

      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("loggedInUserDetails");
      sessionStorage.removeItem("authToken");

      this.uiService.updateIsLoggedIn(false); // Update isLoggedIn value

      this.router.navigate(['/login']);
    }
    else return;
  }

  redirectToLogin() {
    this.uiService.updateIsLoggedIn(false); // Update isLoggedIn value
    this.router.navigate(['/login']);
  }
}


