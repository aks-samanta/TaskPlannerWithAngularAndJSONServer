import { Component } from '@angular/core';
import { User } from 'src/app/User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['profile.component.scss']
})
export class ProfileComponent {

   loggedInUserDetails = sessionStorage.getItem('loggedInUserDetails');
   user:User = this.loggedInUserDetails ? JSON.parse(this.loggedInUserDetails) : {};

   

}
