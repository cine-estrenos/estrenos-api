export type CinemarkResponse = {
  timeStamp: number
  cinemas: Cinema[]
  films: Film[]
  comingSoonFilms: ComingSoonFilm[]
  highlights: Highlight[]
  billboards: Billboard[]
  filmsBanners: FilmsBanner[]
  sectionBanners: SectionBanner[]
  filmsAttributes: FilmsAttribute[]
}

export type Billboard = {
  billboardId: number
  title: string
  formats: string[] | null
  jsonTagsId: number[]
}

export type Cinema = {
  id: number
  name: string
  address: string
  description: string
  features: string
  decLatitude: string
  decLongitude: string
  metro: Metro
  buses: string
  manager: string
  urlThumb: string
  urlGoogleMaps: string
}

export enum Metro {
  BEstaciNCarlosGardel = 'B Estaci√≥n Carlos Gardel ',
  Empty = '',
  Metro = ' ',
}

export type ComingSoonFilm = {
  id: number
  name: string
  description: string
  openingDate: string
  urlTrailerYoutube: string
  duration: number
  category: string
  rating: Rating
  urlPoster: string
  twHashTag: null
}

export enum Rating {
  AConfirmar = 'A CONFIRMAR',
}

export type Film = {
  name: string
  id: string
  rating: string
  filmCode: string
  distributor: string
  description: string
  duration: string
  category: string
  openingDate: string
  urlPoster: string
  urlTrailerAmazon: string
  urlTrailerYoutube: string
  twHashTag: string
  personList: PersonList[]
  attributeList: number[]
  formatList: string[]
  cinemaList: number[]
  movieList: MovieList[]
  billboardTagList: number[]
  filmBannerList: number[]
}

export type MovieList = {
  id: number
  format: string
  version: Version
  cinemaList: CinemaList[]
}

export type CinemaList = {
  id: number
  sessionList: SessionList[]
}

export type SessionList = {
  id: number
  feature: number
  seats: number
  dtm: string
}

export enum Version {
  Castellano = 'CASTELLANO',
  Subtitulada = 'SUBTITULADA',
}

export type PersonList = {
  type: Type
  name: string
}

export enum Type {
  A = 'A',
  D = 'D',
}

export type FilmsAttribute = {
  intAttributeId: number
  strTitle: string
  strPosterMessage: null | string
  strPosterCss: null | string
  strSessionMessage: null | string
  strSessionCss: null | string
  strPopinMessage: null | string
  strPopinCss: null | string
}

export type FilmsBanner = {
  id: number
  intPosition: number
  strLink: string
  strUrlImagePath: string
}

export type Highlight = {
  id: number
  strTitle: Metro
  strDescription: Metro
  bitButton: boolean
  strButtonText: Metro
  strButtonAction: string
  strUrlImage: string
  strUrlImageMobile: string
  jsonLoyaltyLevel: number[]
}

export type SectionBanner = {
  id: number
  intPosition: number
  strSectionTitle: string
  strLink: string
  strUrlImagePath: string
  jsonLoyaltyLevel: number[]
}
