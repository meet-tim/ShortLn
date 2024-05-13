export interface ILinksState {
  allLinks: ILinks[];
}

export interface ILinks {
  longUrl: string;
  shortenedUrl: string;
  urlId: string;
}
