import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isLoading: boolean = false;

  constructor(private userService: UserService, private router: Router) {

  }

  isValidEmail(email: string): boolean {
    // Check if email is null or blank
    if (!email || email.trim() == '') {
      return false;
    }

    // Regular expression to validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
  }

  isValidPassword(password: string): boolean {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Regular expressions for character classes
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const digitRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Check if password contains at least one lowercase letter, one uppercase letter, one digit, and one special character
    if (!lowercaseRegex.test(password) ||
      !uppercaseRegex.test(password) ||
      !digitRegex.test(password) ||
      !specialCharRegex.test(password)) {
      return false;
    }

    return true;
  }
  signUp(signUpForm: NgForm) {

    this.isLoading = true;

    if (!this.isValidEmail(signUpForm.value.username)) {
      alert("Username must be a valid Email address.");
      return;
    }
    if (!signUpForm.value.firstName || signUpForm.value.firstName.trim() == '') {
      alert("First name cannot be null !!");
      return;
    }
    if (!signUpForm.value.lastName || signUpForm.value.lastName.trim() == '') {
      alert("Last name cannot be null !!");
      return;
    }
    if (!this.isValidPassword(signUpForm.value.password)) {
      alert("Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long");
      return;
    }
    const user: User = {
      username: signUpForm.value.username,
      firstName: signUpForm.value.firstName,
      lastName: signUpForm.value.lastName,
      password: signUpForm.value.password,
      role: 'ROLE_USER'
    }

    this.userService.signUp(user).subscribe({
      next: (user: User) => {
        this.isLoading = false;
        alert(user.username + " is registered successfully !! ");
        this.router.navigate(['/login']);
        console.log(user);
      },
      error: (error: any) => {
        this.isLoading = false;
        alert(error.message);
        console.error(error);
      }
    });


  }
}