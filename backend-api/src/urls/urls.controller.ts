import { Body, Controller,Delete,Post } from '@nestjs/common';
import { UrlsService } from './urls.service';

@Controller('urls')
export class UrlsController {

    constructor(private readonly urlsService: UrlsService) {}

    @Post('shorten')
    async shortenUrl(@Body('url') url: string): Promise<string> {
      const shortUrl = await this.urlsService.shortenUrl(url);
      return `https://shortln-production.up.railway.app/${shortUrl.shortUrl}`;
    }

    @Delete()
  /*
    @Post('expand')
    async expandUrl(@Body('shortUrl') shortUrl: string): Promise<string> {
      const longUrl = await this.urlsService.expandUrl(shortUrl);
      return longUrl;
    }*/
}
