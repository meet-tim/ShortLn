import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/urls.schema';
import { Model } from 'mongoose';


@Injectable()
export class UrlsService {
    constructor(@InjectModel("Url") private readonly urlModel: Model<Url>) {}

    async findAll(email:string): Promise<Url[]> {
      return this.urlModel.find({owner:email}).exec();
    }

    async findByCode(shortUrl:string): Promise<Url[]> {
        return this.urlModel.find({shortCode:shortUrl}).exec();
      }

    async shortenUrl(url:string,email:string): Promise<Url>{
        const urlObj = new Url();
        urlObj.longUrl = url;
        urlObj.shortCode = this.generateCode(5)
        urlObj.shortenedUrl = `https://shortln-production.up.railway.app/urls/${urlObj.shortCode}`
        
        urlObj.owner = email
        const createdUrl = new this.urlModel(urlObj)
        return createdUrl.save();
    }

    async deleteUrl(id: string): Promise<Url | null> {
        return this.urlModel.findOneAndDelete({ urlId: id }).exec();
    }
    

    private  generateCode(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    

}
