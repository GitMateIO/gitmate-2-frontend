import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserModel, RepoModel, SettingModel, PluginModel } from './../models';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
  constructor(private http: Http) {}
  apiurl = environment.backend_url;

  getUser() {
    return this.http.get(this.apiurl + '/api/me/', { withCredentials: true }).map(response => <UserModel>response.json());
  }

  getRepos() {
    return this.http.get(this.apiurl + '/api/repos/', {withCredentials: true}).map(response => <RepoModel[]>response.json());
  }

  addRepo(id: number) {
    return this.http.patch(this.apiurl + '/api/repos/' + id + '/', {'active': true}, {withCredentials: true}).map(response => <RepoModel>response.json());
  }

  removeRepo(id: number) {
    return this.http.patch(this.apiurl + '/api/repos/' + id + '/', {'active': false}, {withCredentials: true}).map(response => <RepoModel>response.json());
  }

  getPlugins(id: number) {
    return this.http.get(this.apiurl + '/api/plugins/' + id + '/', {withCredentials: true})
    .map(response => <PluginModel[]>response.json().plugins);
  }

  getRepo(id: number) {
    return this.http.get(this.apiurl + '/api/repos/' + id + '/', {withCredentials: true})
    .map(response => <RepoModel>response.json());
  }

  setPluginActive(plugin: PluginModel, repoid: number) {
    return this.http.patch(this.apiurl + '/api/plugins/' + repoid + '/',
                           [
                             {
                               'name': plugin.name,
                               'active': plugin.active,
                             }
                           ]
                           , {withCredentials: true})
    .map(response => <PluginModel[]>response.json().plugins);
  }

  setPluginSetting(plugin_name: string, repoid: number, setting_name: string, setting_value: string) {
    var obj ={};
    obj[setting_name] = setting_value;
    return this.http.patch(this.apiurl + '/api/plugins/' + repoid + '/',
                           [
                             {
                               'name': plugin_name,
                               'settings': obj,
                             }
                           ]
                           , {withCredentials: true})
    .map(response => <PluginModel[]>response.json().plugins);
  }

}
