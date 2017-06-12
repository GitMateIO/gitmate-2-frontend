import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { UserModel } from './../models';
import 'rxjs/add/operator/catch';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: UserModel;
  user_name_message: string;
  user_email_message: string;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(user => this.user = user);
  }

  setEmail() {
    this.apiService.patch('/api/users/me/', {'email': this.user.email})
      .subscribe(
        user => {
          this.user = user;
          this.user_email_message = '';
        },
        err => this.user_email_message = err.json().email[0]);
  }

  setUserName() {
    this.apiService.patch('/api/users/me/', {'username': this.user.username})
      .subscribe(
        user => {
          this.user = user;
          this.user_name_message = '';
        },
        err => this.user_name_message = err.json().username[0]);
  }

}
