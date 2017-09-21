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
	  	"features" : ["All GitMate <a href='/features'>features</a>", "Community Support"],
	  	"price" : "Free",
                "height": 380
	  },
	  {
	  	"title":"Professional",
	  	"highlights" : ["limited to 200 users per organization"],
	  	"features" : ["All GitMate <a href='/features'>features</a>", "Priority Support"],
	  	"price" : "29€ /dev /month",
                "height": 420
	  },
	  {
	  	"title":"Business",
	  	"highlights" : ["unlimited users"],
	  	"features" : ["All GitMate <a href='/features'>features</a>",
                              "Priority Support",
                              "On-Premises Deployment possible"],
	  	"price" : "49€ /dev /month",
                "height": 380
	  }
  ]

}
