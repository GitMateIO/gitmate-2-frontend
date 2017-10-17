import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs/Rx';
import { ApiService } from './../api/api.service';
import { UserModel } from './../models';
import 'rxjs/add/operator/map';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit, OnDestroy {
  show_labels: false;
  show_dupes: false;
  show_authors: false;
  user: UserModel;
  repo_url = '';
  provider: string;
  name: string;
  response: any;
  status = 'new';
  error_message = '';

  private timer;
  private sub: Subscription;

  constructor(private route: ActivatedRoute,
              private apiService: ApiService) { }

  ngOnInit() {
    this.timer = Observable.timer(5000);
    this.route.params.subscribe(params => {
      this.repo_url = params['url'];
      this.sub = this.timer.subscribe(t => this.get_report());
    });
    this.apiService.getUser().subscribe(user => this.user = user);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


  get_report() {
    this.status = 'pending';
    if (this.repo_url.startsWith('git@')) {
      const reduced_git_url = this.repo_url.replace('git@', '').replace('.com', '').replace('.git', '');
      const colon_split = reduced_git_url.split(/:(.+)/);
      this.provider = colon_split[0];
      this.name = colon_split[1];
    } else {
      const protocoll_split = this.repo_url.split('://');
      const clean_url = protocoll_split[protocoll_split.length - 1 ];
      const provider_split = clean_url.split(/\/(.+)/);
      this.provider = provider_split[0].replace('www.', '').replace('.com', '');
      this.name = provider_split[1].replace(/\/+$/, '');
    }
      return this.apiService.getReport(this.name, this.provider)
    .subscribe(
      (data) => {
        this.response = data;
        this.status = 'done';
        this.sub.unsubscribe();
        if (this.response.state !== 'done') {
          this.sub = this.timer.subscribe(t => this.get_report());
        }
      },
      (err) => {
        this.status = 'error';
        this.error_message = err._body;
        this.response.state = 'reqerror';
        this.sub.unsubscribe();
      });
  }

  reportKeyDown(event) {
    if (event.key === 'Enter') {
      this.get_report();
    }
  }
  loginGitHub() {
    window.location.href = environment.backend_url + '/auth/login/github/';
  }


  loginGitLab() {
    window.location.href = environment.backend_url + '/auth/login/gitlab/';
  }
}
