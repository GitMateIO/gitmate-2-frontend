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
	  	"highlights" : ["Limited to 8 users per organization"],
	  	"features" : [],
	  	"price" : "Free",
                "height": 380
	  },
	  {
	  	"title":"Professional",
	  	"highlights" : ["Limited to 200 users per organization"],
	  	"features" : ["Priority Support"],
	  	"price" : "29€ /dev /month",
                "height": 420
	  },
	  {
	  	"title":"Enterprise",
	  	"highlights" : ["Unlimited users"],
	  	"features" : ["Priority Support",
                    "On-Premises Deployment possible"],
	  	"price" : "49€ /dev /month",
                "height": 380
	  }
  ]

}
