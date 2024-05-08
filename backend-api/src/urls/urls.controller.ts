import { Body, Controller,Delete,Get,Param,Post, UseGuards,Request } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { Url } from './schemas/urls.schema';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('urls')
export class UrlsController {

    constructor(private readonly urlsService: UrlsService) {}

    @UseGuards(AuthGuard)
    @Get('all')
    async getUrls(@Request() req):Promise<Url[]>{
        return this.urlsService.findAll(req.user.email);
    }

    @UseGuards(AuthGuard)
    @Post('shorten')
    async shortenUrl(@Request() req,@Body('url') url: string): Promise<string> {
      const shortUrl = await this.urlsService.shortenUrl(url,req.user.email);
      return `https://shortln-production.up.railway.app/${shortUrl.shortUrl}`;
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUrl(@Param('id') id: string): Promise<string>{
        await this.urlsService.deleteUrl(id);
        return "success";
    }
}
