import { Component } from '@angular/core';

import { Region } from '../../interfaces/region.type';
import { Country } from '../../interfaces/country.interfaces';

import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css'],
})
export class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];
  public countries: Country[] = [];
  public isLoadingData: boolean = false;
  public initialValue: Region = '';

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byRegion.countries;
    this.initialValue = this.countriesService.cacheStore.byRegion.region!;
  }

  public searchByRegion(term: string): void {
    this.isLoadingData = true;

    this.countriesService.searchByRegion(term as Region).subscribe((data) => {
      this.countries = data;
      this.isLoadingData = false;
    });
  }
}
