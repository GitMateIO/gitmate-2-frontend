import { Component, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { UserModel } from './../models';
import { environment } from './../../environments/environment';

@Component({
  selector: 'gm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  user: UserModel;
  search_bar_expanded = false;
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUser().subscribe(user => this.user = user);
  }

  userDefined() {
    return !(this.user == null);
  }

  loginGitHub() {
    window.location.href = environment.backend_url + '/auth/login/github/';
  }

  loginGitLab() {
    window.location.href = environment.backend_url + '/auth/login/gitlab/';
  }

  logout() {
    window.location.href = environment.backend_url + '/logout';
  }

  onSearchBarResized(expanded: boolean) {
    this.search_bar_expanded = expanded;
  }
}
