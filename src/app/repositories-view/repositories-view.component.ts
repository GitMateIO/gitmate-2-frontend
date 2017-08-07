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
  selected_owner: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.selected_owner = 'all';
    this.apiService.getRepos(true).subscribe(repos => this.repos = repos);
    this.apiService.getUncachedRepos().subscribe(repos => this.repos = repos);
  }

  update_repos() {
    this.apiService.getRepos().subscribe(repos => this.repos = repos);
  }

  owner_options() {
    const owners = [];
    for (const repo of this.repos){
      const owner = repo.provider + '/' + repo.full_name.substring(0, repo.full_name.lastIndexOf('/'));
      if (owners.indexOf(owner) < 0) {
        owners.push(owner);
      }
    }
    owners.sort();
    owners.push('all');
    return owners;
  }

  valid_owner(provider, full_name) {
    if (this.selected_owner === 'all') {
      return true;
    }
    const owner = provider + '/' + full_name.substring(0, full_name.lastIndexOf('/'));
    return owner === this.selected_owner;
  }
}
