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
      "title":"Free",
      "features": [
        "Handle up to 50 issues/month",
        "Limited to 8 users per organization",
        "Community Support",
      ],
      "price": {"amount": "Free", "limit": "always!"},
      "height": 440
    },
    {
      "title":"Startup",
      "features": [
        "Handle up to 100 issues/month",
        "Limited to 20 users per organization",
        "Priority Support",
      ],
      "price" : {"amount": "39€", "limit": "/month"},
      "height": 400
    },
    {
      "title":"Professional",
      "features": [
        "Handle up to 200 issues/month",
        "Unlimited users",
        "Priority Support",
      ],
      "price" : {"amount": "79€", "limit": "/month"},
      "height": 400
    },
    {
      "title":"Enterprise",
      "features": [
        "Handle up to 500 issues/month",
        "Unlimited users",
        "Priority Support",
      ],
      "price" : {"amount": "149€", "limit": "/month"},
      "height": 400
    },
    {
      "title":"Unicorn",
      "features": [
        "More than 500 issues/month",
        "Unlimited users",
        "Priority Support",
        "Issue Analytics",
        "On-premises deployment"
      ],
      "price" : {"amount": "Contact Us", "limit": "/month"},
      "height": 400
    }
  ]

}
