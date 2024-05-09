import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { IAllLinks, IAllLinksResponseError } from './links.interface';
import { CustomError } from '../../lib/CustomError';

@Injectable({
  providedIn: 'root',
})
export class LinksService {
  http = inject(HttpClient);

  getAllLinks(): Promise<IAllLinks | CustomError<IAllLinksResponseError>> {
    return lastValueFrom<IAllLinks | CustomError<IAllLinksResponseError>>(
      this.http.get<IAllLinks | CustomError<IAllLinksResponseError>>(
        `${environment.apiUrl}/urls/all`,
      ),
    );
  }

  shortenLink(link: string) {
    return lastValueFrom(
      this.http.post(`${environment.apiUrl}/urls/shorten`, {
        url: link,
      }),
    );
  }
}
