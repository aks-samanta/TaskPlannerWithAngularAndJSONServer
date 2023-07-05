import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  editMode: boolean = false;
  isPictureUploading = false;
  isUpdating = false;
  user!: User;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    const loggedInUserDetails = sessionStorage.getItem('loggedInUserDetails');
    this.user = loggedInUserDetails ? JSON.parse(loggedInUserDetails) : {};

    this.profileForm = this.formBuilder.group({
      firstName: [this.user.firstName || '', Validators.required],
      lastName: [this.user.lastName || '', Validators.required],
      username: [{ value: this.user.username, disabled: true }],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/)
        ])
      ],
      profileImage: ['', [this.validateFileSize]] // 1 MB = 1048576 bytes
    });
  }

  // Getters for form controls
  get username() {
    return this.profileForm.get('username');
  }
  get firstName() {
    return this.profileForm.get('firstName');
  }
  get lastName() {
    return this.profileForm.get('lastName');
  }
  get password() {
    return this.profileForm.get('password');
  }

  // Custom validator for file size
  validateFileSize(control: FormControl) {
    const file = control.value;

    if (file && file.size) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert file size to MB
      const maxFileSizeInMB = 1; // Define the maximum file size in MB
      if (fileSizeInMB > maxFileSizeInMB) {
        return { fileSizeExceeded: true };
      }
    }
    return null;
  }

  // Toggle edit mode
  toggleEditMode() {
    this.editMode = !this.editMode;
    // Reset form values when exiting edit mode
    if (!this.editMode) {
      this.profileForm.reset(this.user);
    }
  }

  // Check if a field is invalid
  isFieldInvalid(fieldName: string) {
    const formControl = this.profileForm.get(fieldName);
    return formControl?.invalid && (formControl.touched || formControl.dirty);
  }

  // Update profile
  updateProfile() {
    this.isUpdating = true;

    // Perform update logic and save user details
    this.user.firstName = this.profileForm.controls['firstName'].value;
    this.user.lastName = this.profileForm.controls['lastName'].value;
    this.user.password = this.profileForm.controls['password'].value;

    this.userService.updateUser(this.user).subscribe({
      next: (user) => {
        if (user.status === 400) {
          alert(" Update failed: " + user.detail);
          return;
        }
        alert(user.username + " is updated successfully !! ");
        this.router.navigate(['/profile']);
        this.user = user;
        this.toggleEditMode();
        sessionStorage.setItem('loggedInUserDetails', JSON.stringify(this.user));
        console.log(user);
        this.isUpdating = false;
      },
      error: (e) => {
        this.isUpdating = false;
        alert("Update failed: " + e.message);
      },
      complete: () => {
        console.info('complete');
        this.isUpdating = false;
      }
    });
  }

  // Handle profile image change
  handleProfileImageChange(event: any) {
    this.isPictureUploading = true;
    const file = event.target.files[0];

    // Construct the Cloudinary upload URL
    const cloudName = 'dbtflbnmy';
    const uploadPreset = 'b54iwlwa';
    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    // Create a FormData object to send the file
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);

    // Make the POST request to upload the file
    this.http.post(uploadUrl, formData).subscribe({
      next: (response: any) => {
        // Handle the response from Cloudinary
        // Extract the URL of the uploaded image from the response
        const imageUrl = response.url;

        // Update the user's profileImageUrl property with the Cloudinary image URL
        this.user.profileImageUrl = imageUrl;
        sessionStorage.setItem('loggedInUserDetails', JSON.stringify(this.user));
        this.isPictureUploading = false;
      },
      error: (error: any) => {
        // Handle the error if the upload fails
        this.isPictureUploading = false;
        console.error('Error uploading file to Cloudinary:', error);
      }
    });
  }
}
