import { Component, Input, OnInit } from '@angular/core';

import { ApiService } from './../api/api.service';
import { RepoModel, PluginModel, SettingModel } from './../models';

@Component({
  selector: 'app-plugins',
  templateUrl: './plugins.component.html',
  styleUrls: ['./plugins.component.css']
})
export class PluginsComponent implements OnInit {
  @Input()
  repoid: string;
  plugins: PluginModel[];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getPlugins(this.repoid).subscribe(plugins => this.plugins = plugins);
  }
}
