import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/observable/of';

import { UserModel, RepoModel, SettingModel, PluginModel } from './../models';
import { environment } from './../../environments/environment';

@Injectable()
export class ApiService {
  cached_repos: RepoModel[];
  private cache_observable: Observable<any>;

  apiurl = environment.backend_url;

  constructor(private http: Http) {
    const _ = this.getRepos().subscribe();
  }

  patch(api_dir: string, payload: any) {
    return this.http.patch(this.apiurl + api_dir, payload, {withCredentials: true}).map(response => response.json());
  }

  getUser() {
    return this.http.get(this.apiurl + '/api/users/me/', { withCredentials: true }).map(response => <UserModel>response.json());
  }

  getRepos(allow_cached = false) {
    if (this.cache_observable) {
      // if this.cache_observable is set then the request is in progress
      // return the Observable of the ongoing request
      return this.cache_observable;
    } else if (this.cached_repos && allow_cached) {
      // if we have the repos, just return an them as Observable
      return Observable.of(this.cached_repos);
    } else {
      // create the request and store the observable
      this.cache_observable = this.http.get(this.apiurl + '/api/repos/?cached=0', {withCredentials: true})
      .map(response => {
        // when the cached data is available we don't need the Observable anymore
        this.cache_observable = null;

        this.cached_repos = response.json();
        return this.cached_repos;
      // make it shared so that more than one subscriber can get the result
      })
      .share();
      return this.cache_observable;
    }
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
