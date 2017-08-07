import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {

  sentence: string;
  sentences = [
    'Waking up your inner Git Mate...',
    'Force pushing to master...',
    'Slacking off...',
    'Waiting for the right moment...',
    'Integrating the continuum...',
    'Killing orphaned children...',
    'Installing node modules...',
    'It should be working now...',
    'Turning it off and on again...',
    'It works on my machine...',
    'Turning caffeine into code...',
    'Downloading the internet...',
    'Come visit at 127.0.0.1...',
  ]

  constructor() {
    this.sentence = this.sentences[
      Math.floor(Math.random()*this.sentences.length)
    ];
  }

  ngOnInit() {
  }

}
