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
        "title" : "Tracks Duplicate Issues",
        "description":"<p>GitMate posts a comment including likely duplicates \
                       and related issues on newly opened issues.</p>\
                       <p>Helps maintainers to easily filter duplicates. \
                       Users, on the other hand, can instantly find \
                       helpful information in the listed threads.</p>",
        "img" : "issue_duplicate.png",
        "upcoming": false
      },
      {
        "title" : "Calls for Help",
        "description" :"<p>GitMate determines who had the most experience with a certain \
                        part of the project or a specific kind of issues, \
                        based on their previous involvement and notifies the \
                        appropriate contributors to involve in the discussion.</p>",
        "img": "call_for_help.png",
        "upcoming": false
      },
      {
        "title" : "Sets Labels automatically",
        "description" :"<p>When a new issue is opened, \
                        GitMate automatically sets the appropriate labels based on the conventions you are already using. \
                        It learns from your past labels and continuously improves.<p> \
                        <p>You can define your own set of keywords too!</p>",
        "img": "tagging_issues.png",
        "upcoming": false
      },
      {
        "title" : "Handles Inactive Issues",
        "description": "<p>GitMate helps prevent cruft from accumulating on \
                        your projects by setting a label, posting a message, \
                        unassigning inactive developers, and eventually \
                        closing the issue.</p><p>The exact behaviour is \
                        dependant on the labels applied and can be configured \
                        extensively.</p>",
        "img": "stale_issues.png",
        "upcoming": false
      },
      {
        "title" : "Determines Missing Information",
        "description":"<p>Oftentimes, users report issues without providing \
                       crucial information.\ GitMate can detect \
                       missing information from your templates,\
                       label the issue as \"needs-info\" and ask the user to \
                       provide it.</p><p>Stop worrying about incomplete \
                       bug reports ever again. GitMate will automatically \
                       close such issues over time.</p>",
        "img": "find_missing_info.png",
        "upcoming": true
      },
      {
        "title" : "Clean Issues for Unsupported Versions",
        "description" :"<p>GitMate automatically identifies the version \
                        number in any bug report and asks the user to \
                        reproduce the error with a supported version if \
                        needed.<p> \
                        <p>You don't need to worry about bugs which aren't \
                        occurring anymore.</p>",
        "img": "tagging_issues.png",
        "upcoming": true
      },
  ]
}
