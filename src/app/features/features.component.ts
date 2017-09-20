import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  features = [
	  	{
	  		"title" : "Feature Title",
	  		"description" :"FD",
	  		"img" : "img"
	  	},
	  	{
	  		"title" : "Feature Title 2",
	  		"description" :"FD",
	  		"img" : "img"
	  	},
	  	{
	  		"title" : "Feature Title 3",
	  		"description" :"FD",
	  		"img" : "img"
	  	}
  ]
}
