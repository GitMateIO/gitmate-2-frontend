import { Component, ViewChild, OnChanges, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.css']
})
export class SearchSelectComponent implements OnChanges {
  @ViewChild('search') searchElementRef;
  @ViewChild('auto') autocompleteElementRef;
  @Input() choices: any[];
  @Input() placeholder: string;
  @Output() selected = new EventEmitter<string>();
  inputValue = '';
  filteredResults: any[];

  constructor() {}

  filterResults(val: string) {
    return this.choices.filter(t => !val || (t.toLowerCase().indexOf(val.toLowerCase()) !== -1));
  }

  onSelect(event, item) {
    // this event is raised for selected and deselected items.
    // we can differentiate them by event.isUserInput..
    if (event.isUserInput) {
      this.selected.emit(item);
    }
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      const results = this.filterResults(this.searchElementRef.nativeElement.value);
      if (results) {
        this.inputValue = results[0];
        this.filteredResults = [];
        this.selected.emit(results[0]);
      }
    } else if (event.key === 'Escape') {
      this.filteredResults = [];
      this.searchElementRef.nativeElement.blur();
    }
  }

  onClear() {
    this.inputValue = '';
  }

  ngOnChanges(changes) {
    this.onClear();
  }
}
