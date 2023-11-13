import { Region } from './region.type';
import { Country } from './country.interfaces';

export interface CacheStore {
  byCapital: TermCountries;
  byCountry: TermCountries;
  byRegion: RegionCountries;
}

interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  region?: Region;
  countries: Country[];
}
