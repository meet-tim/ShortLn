import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Url } from './schemas/urls.schema';
import { Model } from 'mongoose';


@Injectable()
export class UrlsService {
    constructor(@InjectModel("Url") private readonly userModel: Model<Url>) {}

    async findAll(): Promise<Url[]> {
      return this.userModel.find().exec();
    }

    async shortenUrl(url:string): Promise<Url>{
        const urlObj = new Url();
        urlObj.originalUrl = url;
        urlObj.shortUrl = this.generateCode(5)
        const createdUrl = new this.userModel(urlObj)
        return createdUrl.save();
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
