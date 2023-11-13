import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, catchError, of, map, delay, tap } from 'rxjs';

import { Region } from '../interfaces/region.type';
import { Country } from '../interfaces/country.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private baseApiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  };

  constructor(private httpClient: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage(): void {
    if (!localStorage.getItem('cacheStore')) return;

    this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(url).pipe(
      catchError(() => of([])),
      delay(500)
    );
  }

  public searchByCapital(term: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/capital/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((data) => (this.cacheStore.byCapital = { term, countries: data })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchByCountry(term: string): Observable<Country[]> {
    const url = `${this.baseApiUrl}/name/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap((data) => (this.cacheStore.byCountry = { term, countries: data })),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchByRegion(term: Region): Observable<Country[]> {
    const url = `${this.baseApiUrl}/region/${term}`;

    return this.getCountriesRequest(url).pipe(
      tap(
        (data) => (this.cacheStore.byRegion = { region: term, countries: data })
      ),
      tap(() => this.saveToLocalStorage())
    );
  }

  public searchByAlphaCode(code: string): Observable<Country | null> {
    return this.httpClient
      .get<Country[]>(`${this.baseApiUrl}/alpha/${code}`)
      .pipe(
        map((countries) => (countries.length > 0 ? countries[0] : null)),
        catchError(() => of(null))
      );
  }
}
