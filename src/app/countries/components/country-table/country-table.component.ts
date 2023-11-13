import { Component, Input, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css'],
})
export class CountryTableComponent implements OnInit {
  @Input() public countries: Country[] = [];
  @Input() public searchTerm: string = '';
  @Input() public cacheTerm: string = '';
  @Input() public component: string = '';

  public noResultsFound: boolean = false;

  ngOnInit(): void {
    this.noResultsFound =
      this.searchTerm.length > 0 &&
      this.cacheTerm.length > 0 &&
      this.countries.length === 0;
  }

  public get alertMessage(): string {
    if (this.noResultsFound) {
      return 'No results found :(';
    } else {
      switch (this.component) {
        case 'region':
          return 'You have not selected a region';
        case 'country':
          return 'Type a country name!';
        case 'capital':
          return 'Type the capital of a country!';

        default:
          return '';
      }
    }
  }
}
