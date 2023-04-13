import { HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading: boolean = false;

  isLoggedIn?: boolean;
  isLoggedInSubscription?: Subscription;

  constructor(private userService: UserService, private router: Router, private uiService: UiService) {
    this.isLoggedInSubscription = this.uiService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit() {
    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") == 'true';
  }

  login(loginForm: NgForm) {
    const username = loginForm.value.username;
    const password = loginForm.value.password;

    this.isLoading = true;
    this.userService.login(username, password).subscribe({
      next: (v) => {
        console.log(v.body);

        this.isLoading = false; // Set isLoading to false to hide the spinner

        sessionStorage.setItem('authToken', (v.headers.get("authorization")));

        sessionStorage.setItem('isLoggedIn', 'true');

        sessionStorage.setItem('loggedInUserDetails', JSON.stringify(v.body));

        this.uiService.updateIsLoggedIn(true);

        this.router.navigate(['/']); // Redirect to home page
      },
      error: (e) => {
        this.isLoading = false; // Set isLoading to false to hide the spinner
        console.error(e)
        alert("Invalid Credentials !!");
      }, // Handle error
      complete: () => {
        console.info('complete')
      }
    })



  }
}

