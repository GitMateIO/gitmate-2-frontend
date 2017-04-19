import { Component,  EventEmitter, Input, Output, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { RepoModel } from './../models';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.component.html',
  styleUrls: ['./repository.component.css']
})
export class RepositoryComponent implements OnInit {
  @Output()
  active_toggled: EventEmitter<string> = new EventEmitter();

  @Input()
  repo: RepoModel;

  user: string;
  title: string;

  constructor(private apiService: ApiService) { }

  toggle() {
    if (!this.repo.active) {
      this.apiService.addRepo(this.repo.id).subscribe(repo => this.repo = repo);
      this.active_toggled.emit('enabled');
    } else {
      this.apiService.removeRepo(this.repo.id).subscribe(repo => this.repo = repo);
      this.active_toggled.emit('disabled');
    }
  }

  ngOnInit() {
    this.user = this.repo.full_name.split('/')[0];
    this.title = this.repo.full_name.split('/')[1];
  }
}
