import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';
import { Http } from '@angular/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  name = 'gitmate/open-source/gitmate-2';
  provider = 'gitlab';
  response: any;
  apiurl = environment.backend_url;
  status = 'new';

  constructor(private http: Http) {
  }

  ngOnInit() {
  }

  get_report() {
    this.status = 'pending';
    return this.http.get(this.apiurl +
                         '/api/plugin/similar_ee/report/?repo=' + this.name + '&provider=' +
                         this.provider, { withCredentials: true }).map(response => response.json())
    .subscribe(response => {
      this.response = response;
      this.status = 'done';
    });
  }
}
