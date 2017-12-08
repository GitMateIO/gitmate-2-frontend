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
    'Playing elevator music...',
    'Testing your patience...',
    'Hang on a second, I know your data is somewhere here...',
    'Copying your passwords...',
    'Scanning browsing history...',
    'Recording IP Address...',
    'Generating ads...',
    'Counting the stars...',
    'Searching for WiFi...',
    'Improving your reading skills...',
    'Just stalling to simulate activity...',
    'Creating the universe...',
    'Opening pod bay doors...',
    'Commencing infinite loop...',
    'Spinning the wheel of fortune...',
    'Starting missile launch sequence in 10, 9...',
    'Waiting for magic to happen...',
    'Wiping our drives...',
    'Bending the spoon...',
    'Clearing my throat...',
    'Deciphering your intentions...',
    'Hit F0 to continue...',
    'HTTP 418 - waiting for YOU to brew coffee...',
    'Press f5 for faster loading...',
  ]

  constructor() {
    this.sentence = this.sentences[
      Math.floor(Math.random()*this.sentences.length)
    ];
  }

  ngOnInit() {
  }

}
