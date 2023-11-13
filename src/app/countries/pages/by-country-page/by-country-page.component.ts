import { Component, OnInit } from '@angular/core';

import { Country } from '../../interfaces/country.interfaces';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrls: ['./by-country-page.component.css'],
})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoadingData: boolean = false;
  public initialValue: string = '';
  public searchTerm: string = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.term;

    this.searchTerm = this.initialValue;
  }

  public searchByCountryName(term: string): void {
    this.isLoadingData = true;

    this.searchTerm = term;
    this.initialValue = term;

    this.countriesService.searchByCountry(term).subscribe((data) => {
      this.countries = data;
      this.isLoadingData = false;
    });
  }
}
