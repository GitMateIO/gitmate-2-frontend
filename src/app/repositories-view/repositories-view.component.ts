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
  filter_active_only = false;
  filter_term = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.update_repos();
  }

  update_repos() {
    this.apiService.getRepos().subscribe(repos => this.repos = repos);
  }

  valid(repo: RepoModel) {
    if (repo.full_name.indexOf(this.filter_term) === -1 ) {
      return false;
    }
    if (this.filter_active_only && !repo.active) {
      return false;
    }
    return true;
  }

}
