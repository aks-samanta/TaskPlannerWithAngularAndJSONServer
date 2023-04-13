import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiService } from './services/ui.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn?: boolean;

  isLoggedInSubscription?: Subscription;

  constructor(private router: Router, private uiService: UiService) {
    this.isLoggedInSubscription = this.uiService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });
  }
  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") == 'true';
  }



  logout() {

    if(confirm("Are you sure you want to logout?")){

    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("LoggedInUser");
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


