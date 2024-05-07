import { Body, Controller,Delete,Get,Param,Post } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './schemas/urls.schema';

@Controller('urls')
export class UrlsController {

    constructor(private readonly urlsService: UrlsService) {}

    @Get('all')
    async getUrls():Promise<Url[]>{
        return this.urlsService.findAll();
    }
    @Post('shorten')
    async shortenUrl(@Body('url') url: string): Promise<string> {
      const shortUrl = await this.urlsService.shortenUrl(url);
      return `https://shortln-production.up.railway.app/${shortUrl.shortUrl}`;
    }

    @Delete(':id')
    async deleteUrl(@Param('id') id: string): Promise<string>{
        await this.urlsService.deleteUrl(id);
        return "success";
    }


  /*
    @Post('expand')
    async expandUrl(@Body('shortUrl') shortUrl: string): Promise<string> {
      const longUrl = await this.urlsService.expandUrl(shortUrl);
      return longUrl;
    }*/
}
