import { Component, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hotkey, HotkeysService } from 'angular2-hotkeys';
import { Router } from '@angular/router';

import { ApiService } from './../api/api.service';
import { RepoModel  } from './../models';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent implements OnInit {
  @ViewChild('search') searchElementRef;
  @ViewChild('auto') autocompleteElementRef;
  @Output() onResized = new EventEmitter<boolean>();
  inputValue = '';
  filteredResults: any[];

  constructor(private _hotkeysService: HotkeysService,
              private router: Router,
              private apiService: ApiService) {
    this._hotkeysService.add(new Hotkey(
      'ctrl+space',
      (event: KeyboardEvent): boolean => {
        this.searchElementRef.nativeElement.focus();
        return false; // Prevent bubbling
      },
      ['INPUT', 'SELECT', 'TEXTAREA'], // hotkey fires also when in these elements
      'Search repositories, settings, and documentation')); // description
  }

  autoCompleteTargets() {
    const repos = this.apiService.cached_repos ? this.apiService.cached_repos
                                               : [];
    const targets = [
      {
        name: 'Home',
        target: '/home'
      },
      {
        name: 'Profile',
        target: '/profile'
      },
      {
        name: 'Repositories',
        target: '/repositories'
      },
    ];
    for (const repo of repos){
      targets.push(
        {
          name: repo.full_name,
          target: '/repo/' + repo.id
        }
      );
    }
    return targets;
  }

  filterResults(val: string) {
    const targets = this.autoCompleteTargets();
    return targets ? targets.filter(t => val && (t.name.toLowerCase().indexOf(val.toLowerCase()) !== -1))
                   : [];
  }

  onSelect(event, item) {
    // this event is raised for selected and deselected items.
    // we can differentiate them by event.isUserInput..
    if (event.isUserInput) {
      this.router.navigate([item.target]);
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const results = this.filterResults(this.searchElementRef.nativeElement.value);
      if (results) {
        const target = results[0].target;
        this.inputValue = '';
        this.filteredResults = [];
        this.router.navigate([target]);
      }
    } else if (event.key === 'Escape') {
      this.filteredResults = [];
      this.searchElementRef.nativeElement.blur();
    }
  }

  ngOnInit() {
  }

  onFocus() {
    this.onResized.emit(true);
  }
  onBlur() {
    this.onResized.emit(false);
  }
}
