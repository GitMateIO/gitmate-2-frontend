import { Component, OnInit } from '@angular/core';
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

  pricing = [
	  {
	  	"title":"Basic",
	  	"highlights" : ["limited to 8 users per organization"],
	  	"features" : [],
	  	"price" : "Free",
                "height": 380
	  },
	  {
	  	"title":"Professional",
	  	"highlights" : ["limited to 200 users per organization"],
	  	"features" : ["Priority Support"],
	  	"price" : "29€ /dev /month",
                "height": 420
	  },
	  {
	  	"title":"Business",
	  	"highlights" : ["unlimited users"],
	  	"features" : ["Priority Support",
                              "On-Premises Deployment possible"],
	  	"price" : "49€ /dev /month",
                "height": 380
	  }
  ]

}
