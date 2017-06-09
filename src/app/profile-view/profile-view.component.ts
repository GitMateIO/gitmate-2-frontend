import { Component, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';
import { UserModel } from './../models';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  user: UserModel;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(user => this.user = user);
  }

}
