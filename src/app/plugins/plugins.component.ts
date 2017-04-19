import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { RepoModel, PluginModel, SettingModel } from './../models';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})
export class PluginsComponent implements OnInit {
  repoid: number;
  plugins: PluginModel[];
  repo: RepoModel;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.forEach(
      (params: Params) => {
        this.repoid = params['id'];
      }
    );
    this.apiService.getPlugins(this.repoid).subscribe(plugins => this.plugins = plugins);
    this.apiService.getRepo(this.repoid).subscribe(repo => this.repo = repo);
  }
}
