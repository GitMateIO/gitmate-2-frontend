import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

import { UserModel, RepoModel, SettingModel, PluginModel } from './../models';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
  cached_repos: RepoModel[];
  apiurl = environment.backend_url;

  constructor(private http: Http) {
    this.updateCachedRepos();
  }

  patch(api_dir: string, payload: any) {
    return this.http.patch(this.apiurl + api_dir, payload, {withCredentials: true}).map(response => response.json());
  }

  getUser() {
    return this.http.get(this.apiurl + '/api/users/me/', { withCredentials: true }).map(response => <UserModel>response.json());
  }

  getRepos() {
    return this.http.get(this.apiurl + '/api/repos/', {withCredentials: true}).map(response => <RepoModel[]>response.json());
  }

  getCachedRepos() {
    return Observable.of(this.cached_repos);
  }

  updateCachedRepos() {
    this.http.get(this.apiurl + '/api/repos/', {withCredentials: true})
    .map(response => <RepoModel[]>response.json())
    .subscribe(repos => this.cached_repos = repos);
  }

  set_user(id: number, user: string) {
    return this.http.patch(this.apiurl + '/api/repos/' + id + '/', {'user': user}, {withCredentials: true}).map(response => <RepoModel>response.json());
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
