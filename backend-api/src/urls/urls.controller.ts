import { Body, Controller,Delete,Get,Param,Post, UseGuards,Request, Redirect } from '@nestjs/common';
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
      return shortUrl.shortenedUrl;
    }
    @UseGuards(AuthGuard)
    @Delete(':id')
    async deleteUrl(@Param('id') id: string): Promise<string>{
        await this.urlsService.deleteUrl(id);
        return {message:"success"};
    }

    @Get(':shortCode')
    @Redirect('https://nestjs.com', 301)
    async redirectToOriginalUrl(@Param('shortCode') shortCode: string){
        const urls = await this.urlsService.findByCode(shortCode);
        if (urls.length!==0){
            const url = urls[0];
            console.log(url);
            return {url:url.longUrl} 
        }
    }
}
