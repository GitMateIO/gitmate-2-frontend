import { Component, OnInit } from '@angular/core';
import { environment } from './../../environments/environment';
import {MdGridListModule} from '@angular/material';


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  loginGitHub() {
    window.location.href = environment.backend_url + '/auth/login/github/';
  }


  loginGitLab() {
    window.location.href = environment.backend_url + '/auth/login/gitlab/';
  }

  pricing = [
    {
      "title":"Basic",
      "features" : ["Limited to 8 users per organization"],
      "price": {"amount": "Free", "limit": null},
      "height": 430
    },
    {
      "title":"Professional",
      "features": [
        "Limited to 200 users per organization",
        "Priority Support"
      ],
      "price" : {"amount": "29€", "limit": "user/month"},
      "height": 480
    },
    {
      "title":"Enterprise",
      "features": [
        "Unlimited users",
        "Priority Support",
        "On-premises deployment"
      ],
      "price" : {"amount": "49€", "limit": "user/month"},
      "height": 430
    }
  ]

}
