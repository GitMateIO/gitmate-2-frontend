import { Component, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { UserModel } from './../models';

@Component({
  selector: 'gm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  user: UserModel;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(user => this.user = user);
  }

  userDefined() {
    return !(this.user == null);
  }

  loginGitHub() {
    window.location.href = 'http://localhost:8000/auth/login/github/';
  }

  logout() {
    window.location.href = 'http://localhost:8000/logout';
  }
}
