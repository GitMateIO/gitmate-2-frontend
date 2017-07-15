import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { ApiService } from './../api/api.service';

@Component({
  selector: 'dict-setting',
  templateUrl: './dict-setting.component.html',
  styleUrls: ['./dict-setting.component.css']
})
export class DictSettingComponent implements OnInit {
  @Input() description: string;
  @Input() backend_dict: any;
  @Input() repoid: number;
  @Input() plugin_name: string;
  @Input() setting_name: string;
  dict_list: any[];

  constructor(
    private apiService: ApiService) { }

    ngOnInit() {
      this.dict_list = this.list_from_dict(this.backend_dict);
    }

    list_from_dict(dict) {
      const keys = Object.keys(dict);
      keys.sort();

      const list = [];
      for (const key of keys){
        list.push([key, dict[key]]);
      }
      list.push(['', '']);
      return list;
    };

    delete_setting(setting_tuple) {
      const index = this.dict_list.indexOf(setting_tuple, 0);
      if (index > -1) {
        this.dict_list.splice(index, 1);
      }
      this.update(null);
    }

    update(setting) {
      if (this.is_empty(setting)) {
        this.delete_setting(setting);
      }
      this.ensure_last();
      const dict = this.make_dict();
      this.backend_dict = dict;
      this.make_request();
    }

    ensure_last(focus = false) {
      if (!this.is_empty(this.dict_list[this.dict_list.length - 1])) {
        this.dict_list.push(['', '']);
      } else if (this.is_empty(this.dict_list[this.dict_list.length - 2])) {
        this.dict_list.pop();
      }
    }

    is_empty(setting) {
      return JSON.stringify(setting) === JSON.stringify(['', '']);
    }

    make_dict() {
      const dict = {};
      for (const setting of this.dict_list){
        if (setting[0] !== '') {
          dict[setting[0]] = setting[1];
        }
      }
      return dict;
    }

    hint(setting) {
      const index = this.dict_list.indexOf(setting, 0);
      if (index === this.dict_list.length - 1) {
        return null;
      }
      if (setting[0] === '') {
        return 'Blank entries will be ignored';
      }
      for (const later_setting of this.dict_list.slice(index + 1, this.dict_list.length)) {
        if (later_setting[0] === setting[0]) {
          return 'Duplicated entries will be ignored';
        }
      }
      return null;
    }

    make_request() {
      console.log(this.plugin_name, this.repoid, this.setting_name, this.backend_dict);
      this.apiService.setPluginSetting(this.plugin_name, this.repoid,
                                       this.setting_name, this.backend_dict)
                                       .subscribe(plugins => console.log(plugins));
    }
}
