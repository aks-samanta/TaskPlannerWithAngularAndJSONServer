import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user.service';
import * as md5 from 'md5';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signUpForm!: FormGroup;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
      ])]
    });
  }

  // Add form validation getters for convenient access in the template
  get username() { return this.signUpForm.get('username'); }
  get firstName() { return this.signUpForm.get('firstName'); }
  get lastName() { return this.signUpForm.get('lastName'); }
  get password() { return this.signUpForm.get('password'); }



  signUp() {


    if (this.signUpForm.invalid) {
      return;
    }

    const user: User = {
      username: this.username!.value,
      firstName: this.firstName!.value,
      lastName: this.lastName!.value,
      password: this.password!.value,
      profileImageUrl: `https://www.gravatar.com/avatar/${md5(this.username!.value)}?d=mp`, // Construct the Gravatar URL with the MD5 hash of the email address
      role: 'ROLE_USER'
    }

    this.isLoading = true;
    this.userService.signUp(user).subscribe({
      next: (user) => {
        this.isLoading = false;
        if (user.status === 400) {
          alert("Sign Up failed: " + user.detail);
          this.router.navigate(['/login']);
          return;
        }
        alert(user.username + " is registered successfully !! ");
        this.router.navigate(['/login']);
        console.log(user);
      },
      error: (e) => {
        this.isLoading = false;
        alert("Sign Up failed: " + e.message);
      },
      complete: () => {
        this.isLoading = false;
        console.info('complete')
      }
    });
  }
}


