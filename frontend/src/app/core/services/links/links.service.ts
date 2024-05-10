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

  getAllLinks(): Promise<IAllLinksResponse[]> {
    return lastValueFrom<IAllLinksResponse[]>(
      this.http.get<IAllLinksResponse[]>(`${environment.apiUrl}/urls/all`),
    );
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
