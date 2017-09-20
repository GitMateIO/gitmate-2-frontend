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
	  	"title":"plan 1",
	  	"highlights" : ["h1", "h2", "h3"],
	  	"features" : ["f1", "f2", "f3"],
	  	"price" : "Free"
	  },
	  {
	  	"title":"plan 1",
	  	"highlights" : ["h1", "h2", "h3"],
	  	"features" : ["f1", "f2", "f3", "f4", "f5"],
	  	"price" : "30E/month"
	  },
	  {
	  	"title":"plan 1",
	  	"highlights" : ["h1", "h2", "h3"],
	  	"features" : ["f1", "f2", "f3"],
	  	"price" : "50E/month"
	  }
  ]

}
