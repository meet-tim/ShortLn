export interface IAllLinksResponse {
  _id: string;
  longUrl: string;
  shortenedUrl: string;
  shortCode: string;
  owner: string;
  urlId: string;
  __v: number;
}

export interface IAllLinksResponseError {
  message: string;
  statusCode: number;
}
