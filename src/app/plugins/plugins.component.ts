import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {MdSnackBar} from '@angular/material';

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
    private http: Http,
    public snackBar: MdSnackBar) { }

  ngOnInit() {
    this.route.params
      .switchMap((params: Params) => this.apiService.getPlugins(params['id']))
      .subscribe((plugins: PluginModel[]) => {
        this.plugins = plugins;
        for (const plugin of this.plugins) {
          if (plugin.name === 'similar_ee' && plugin.active === false) {
            plugin.settings[0].value = false;
            plugin.settings[2].value = false;
            plugin.settings[4].value = false;
            this.apiService.setPluginSetting(plugin.name, this.repo.id, plugin.settings[0].name, false).subscribe(resp => {
              this.apiService.setPluginSetting(plugin.name, this.repo.id, plugin.settings[2].name, false).subscribe(res => {
                this.apiService.setPluginSetting(plugin.name, this.repo.id, plugin.settings[4].name, false).subscribe(re => {
                  this.plugins = re;
                });
              });
            });
          }
        }
      });

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

    const backup = [];
    for (const plugin of this.plugins) {
      const plugin_backup = {};
      plugin_backup['name'] = plugin.name;
      plugin_backup['active'] = plugin.active;
      const setting_backup = {};
      for (const setting of plugin.settings) {
        setting_backup[setting.name] = setting.value;
      }
      plugin_backup['settings'] = setting_backup;
      backup.push(plugin_backup);
    }

    this.http.patch(environment.backend_url + '/api/plugins/' + this.repo.id + '/',
                    payload,
                    {withCredentials: true})
                    .map(response => response.json().plugins)
                    .subscribe((new_plugins: PluginModel[]) => {
                      this.plugins = new_plugins;
                      const snackBarRef = this.snackBar.open('Copied settings from ' + origin_repo.full_name, 'undo', {duration: 10000});
                      snackBarRef.onAction().subscribe(() => {
                        this.http.patch(environment.backend_url + '/api/plugins/' + this.repo.id + '/',
                                        backup,
                                        {withCredentials: true})
                                        .map(response => response.json().plugins)
                                        .subscribe((backup_plugins: PluginModel[]) => { this.plugins = backup_plugins; });
                      });
                    });
    });
  }

  setting_change_maybe_toggle_plugin(plugin: any,
                                     setting_name: string,
                                     setting_value: any) {
    this.setting_change(plugin.name, setting_name, setting_value);
    if (plugin.active !== (plugin.settings[0].value || plugin.settings[2].value || plugin.settings[4].value)) {
      this.toggle(plugin);
    }
  }
}
