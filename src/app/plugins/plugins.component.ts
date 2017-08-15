import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { ApiService } from './../api/api.service';
import { RepoModel, PluginModel, SettingModel } from './../models';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})
export class PluginsComponent implements OnInit {
  repoid: number;
  plugins: PluginModel[];
  repo: RepoModel;
  repos: RepoModel[];
  names_of_other_repos = [];
  spin = false;
  toggle_user = false;
  link_icon: string;
  repo_url: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private http: Http) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.apiService.getPlugins(params['id']))
      .subscribe((plugins: PluginModel[]) => this.plugins = plugins);

    this.route.params
      .switchMap((params: Params) => this.apiService.getRepo(params['id']))
      .subscribe((repo: RepoModel) => {
        this.repo = repo;
        this.link_icon = 'fa-' + repo.provider;
        this.repo_url = 'https://' + repo.provider + '.com/' + repo.full_name;
        this.apiService.getRepos().subscribe(repos => {
          this.repos = repos;
          this.names_of_other_repos = [];
          for (const r of repos) {
            if (r.full_name !== this.repo.full_name) {
              this.names_of_other_repos.push(r.full_name);
            }
          }
        });
      });
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

  set_active_user() {
    this.toggle_user = true;
    this.apiService.set_user(this.repo.id, this.repo.user).subscribe(
      repo => {
        this.repo = repo;
        this.toggle_user = false;
      }
    );
  }

  goto_repo() {
    window.open(this.repo_url);
  }

  is_integer(n) {
    return String(n).match(/^[0-9]+$/);
  }

  copy_from(repo_name) {
    const origin_repo = this.repos.filter(function(obj) { return obj.full_name === repo_name; })[0];
    if (this.repo.admins.indexOf(origin_repo.user) >= 0) {
      this.apiService.set_user(this.repo.id, origin_repo.user).subscribe( repo => { this.repo = repo; });
    }

    this.apiService.getPlugins(origin_repo.id).subscribe(plugins => {

    const payload = [];
    for (const plugin of plugins) {
      const plugin_payload = {};
      plugin_payload['name'] = plugin.name;
      plugin_payload['active'] = plugin.active;
      const setting_payload = {};
      for (const setting of plugin.settings) {
        setting_payload[setting.name] = setting.value;
      }
      plugin_payload['settings'] = setting_payload;
      payload.push(plugin_payload);
    }

    this.http.patch(environment.backend_url + '/api/plugins/' + this.repo.id + '/',
                    payload,
                    {withCredentials: true})
                    .map(response => response.json().plugins)
                    .subscribe((new_plugins: PluginModel[]) => this.plugins = new_plugins);
    });
  }
}
