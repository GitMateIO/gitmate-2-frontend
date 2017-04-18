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

  constructor(private apiService: ApiService) { }

  enable() {
    this.apiService.addRepo(this.repo.id).subscribe(repo => this.repo = repo);
    this.active_toggled.emit('enabled');
  }

  disable() {
    this.apiService.removeRepo(this.repo.id).subscribe(repo => this.repo = repo);
    this.active_toggled.emit('disabled');
  }

  ngOnInit() {
  }
}
