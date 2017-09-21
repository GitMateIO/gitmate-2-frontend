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
	  		"title" : "Setting labels automatically",
	  		"description" :"<p>Whenever users or developers open an issue in your repository, \
                        GitMate will automatically set appropriate labels based on the conventions you are already using. \
                        The calculation is based on labels you have set in the past and continuously improves.<p> \
                        <p>Furthermore, keywords can be set up to trigger the assignment of specific labels.</p>",
	  		"img" : "img"
	  	},
	  	{
	  		"title" : "Finding duplicate issues",
	  		"description" :"If a newly opened Issue looks similar to one or more existing ones, \
                        GitMate will post a link to the likely duplicates in a comment of the new issue.\
                        This helps maintainers to find and remove duplicates. Users instantly find \
                        helpful information in the discussions of the linked similar issues.",
	  		"img" : "img"
	  	},
	  	{
	  		"title" : "Calling for help",
	  		"description" :"GitMate can determine which contributors have the most experience with a certain \
                        part of the project or a specific kind off issue, based on their previous involvement. \
                        By mentioning appropriate contributors in the issue discussion, GitMate notifies them of\
                        the issues they need to know about.",
	  		"img" : "img"
	  	},
	  	{
	  		"title" : "Handling stale issues",
	  		"description" : "<p>GitMate helps to prevent cruft from accumulating in your repository by \
                        taking actions on issues that haven't seen work or updates in a long time. Those actions \
                        include setting a label, posting a message, unassigning inactive developers, and eventually \
                        closing the issue.</p>\
                        <p>The exact behaviour is dependend on labels set on the issue and can be extensively configured</p>",
	  		"img" : "img"
	  	}
  ]
}
