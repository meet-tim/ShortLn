import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAllLinksResponse } from './links.service.interface';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  http = inject(HttpClient);

  addLink(link: string) {
    console.log(link);
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/urls/shorten`, {
        url: link,
      }),
    );
  }

  getAllLinks(): Promise<IAllLinksResponse[]> {
    return lastValueFrom<IAllLinksResponse[]>(
      this.http.get<IAllLinksResponse[]>(`${environment.apiUrl}/urls/all`),
    );
  }

  filterFunction(link: IAllLinksResponse): {
    longUrl: string;
    shortenedUrl: string;
    urlId: string;
  } {
    return {
      longUrl: link.longUrl,
      shortenedUrl: link.shortenedUrl,
      urlId: link.urlId,
    };
  }

  shortenLink(link: string) {
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/urls/shorten`, {
        url: link,
      }),
    );
  }

  deleteLink(urlId: string) {
    return lastValueFrom(
      this.http.delete(`${environment.apiUrl}/urls/${urlId}`),
    );
  }
}
