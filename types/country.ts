export interface Country {
  name: {
    common: string
    official: string
    nativeName?: {
      [key: string]: {
        official: string
        common: string
      }
    }
  }
  tld?: string[]
  cca2: string
  ccn3?: string
  cca3: string
  independent?: boolean
  status: string
  unMember?: boolean
  currencies?: {
    [key: string]: {
      name: string
      symbol: string
    }
  }
  capital?: string[]
  altSpellings: string[]
  region: string
  subregion?: string
  languages?: {
    [key: string]: string
  }
  translations: {
    [key: string]: {
      official: string
      common: string
    }
  }
  latlng: number[]
  landlocked: boolean
  borders?: string[]
  area: number
  flag: string
  flags: {
    png: string
    svg: string
    alt?: string
  }
  demonyms?: {
    [key: string]: {
      f: string
      m: string
    }
  }
  population: number
  maps: {
    googleMaps: string
    openStreetMaps: string
  }
  car: {
    signs?: string[]
    side: string
  }
  timezones: string[]
  continents: string[]
  fifa?: string
}
