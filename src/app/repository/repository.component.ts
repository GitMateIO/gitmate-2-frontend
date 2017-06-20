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

  spin = false;

  constructor(private apiService: ApiService) { }

  toggle() {
    this.spin = true;
    if (!this.repo.active) {
      this.apiService.addRepo(this.repo.id).subscribe(
        repo => {
          this.repo = repo;
          this.spin = false;
        }
      );
      this.active_toggled.emit('enabled');
    } else {
      this.apiService.removeRepo(this.repo.id).subscribe(
        repo => {
          this.repo = repo;
          this.spin = false;
        }
      );
      this.active_toggled.emit('disabled');
    }
  }

  ngOnInit() {
    this.user = this.repo.full_name.substr(0, this.repo.full_name.lastIndexOf('/'));
    this.title = this.repo.full_name.split('/').pop();
  }
}
