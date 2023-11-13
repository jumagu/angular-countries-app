import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interfaces';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrls: ['./by-capital-page.component.css'],
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoadingData: boolean = false;
  public initialValue: string = '';
  public searchTerm: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.term;

    this.searchTerm = this.initialValue;
  }

  public searchByCapital(term: string): void {
    this.isLoadingData = true;

    this.searchTerm = term;
    this.initialValue = term;

    this.countriesService.searchByCapital(term).subscribe((data) => {
      this.countries = data;
      this.isLoadingData = false;
    });
  }
}
