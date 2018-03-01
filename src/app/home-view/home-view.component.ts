import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import { ApiService } from './../api/api.service';
import { UserModel } from './../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.css']
})
export class HomeViewComponent implements OnInit {
  user: UserModel;
  report_repo_url = '';
  constructor(private apiService: ApiService,
              private router: Router) {}

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

  loginJira() {
    window.location.href = 'https://eepurl.com/cUXlJ5';
  }

  getReport() {
    this.router.navigate(['report', this.report_repo_url]);
  }

  reportKeyDown(event) {
    if (event.key === 'Enter') {
      this.getReport();
    }
  }
}
