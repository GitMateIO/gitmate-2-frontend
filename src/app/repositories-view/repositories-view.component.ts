import { Component, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { RepoModel } from './../models';

@Component({
  selector: 'app-repositories-view',
  templateUrl: './repositories-view.component.html',
  styleUrls: ['./repositories-view.component.css']
})
export class RepositoriesViewComponent implements OnInit {
  repos: RepoModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getCachedRepos().subscribe(repos => this.repos = repos);
  }

  update_repos() {
    this.apiService.getRepos().subscribe(repos => this.repos = repos);
  }
}
