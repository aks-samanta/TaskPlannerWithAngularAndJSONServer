import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  isLoggedIn?: boolean;
  isLoggedInSubscription?: Subscription;
  username!: string;
  password!: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private uiService: UiService
  ) {
    this.isLoggedInSubscription = this.uiService.isLoggedIn$.subscribe(value => {
      this.isLoggedIn = value;
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = sessionStorage.getItem("isLoggedIn") === 'true';
  }

  login(loginForm: NgForm): void {
    if (loginForm.valid) {
      const username: string = this.username;
      const password: string = this.password;

      this.isLoading = true;
      this.userService.login(username, password).subscribe({
        next: (response) => {
          console.log(response.body);

          this.isLoading = false; // Set isLoading to false to hide the spinner

          sessionStorage.setItem('authToken', response.headers.get("authorization") || '');
          sessionStorage.setItem('isLoggedIn', 'true');
          sessionStorage.setItem('loggedInUserDetails', JSON.stringify(response.body));

          this.uiService.updateIsLoggedIn(true); // To change the login button to logout.

          this.router.navigate(['/']); // Redirect to home page
        },
        error: (error) => {
          this.isLoading = false; // Set isLoading to false to hide the spinner
          console.error(error);
          alert("Invalid Credentials !!");
        },
        complete: () => {
          console.info('complete');
        }
      });
    } else {
      // Mark all form controls as touched to display validation errors
      Object.keys(loginForm.controls).forEach((key: string) => {
        loginForm.controls[key].markAsTouched();
      });
    }
  }
}
