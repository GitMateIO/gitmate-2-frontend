import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { ApiService } from './../api/api.service';
import { UserModel } from './../models';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  user: UserModel;
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
    window.location.href = environment.backend_url + '/auth/login/github/';
  }

  loginBitbucket() {
    window.location.href = 'http://eepurl.com/cUXlJ5';
  }

}
