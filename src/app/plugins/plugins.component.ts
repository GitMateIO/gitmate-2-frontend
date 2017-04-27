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
  spin = false;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.apiService.getPlugins(params['id']))
      .subscribe((plugins: PluginModel[]) => this.plugins = plugins);

    this.route.params
      .switchMap((params: Params) => this.apiService.getRepo(params['id']))
      .subscribe((repo: RepoModel) => this.repo = repo);

  }

  setting_change(plugin_name: string, setting_name: string, setting_value: any) {
    this.apiService.setPluginSetting(plugin_name, this.repo.id, setting_name, setting_value).subscribe(plugins => this.plugins = plugins);

  }
  toggle(plugin) {
    plugin.active = !plugin.active;
    this.apiService.setPluginActive(plugin, this.repo.id).subscribe(plugins => this.plugins = plugins);
  }
  toggle_repo() {
    this.spin = true;
    if (!this.repo.active) {
      this.apiService.addRepo(this.repo.id).subscribe(
        repo => {
          this.repo = repo;
          this.spin = false;
        }
      );
    } else {
      this.apiService.removeRepo(this.repo.id).subscribe(
        repo => {
          this.repo = repo;
          this.spin = false;
        }
      );
    }
  }

}
