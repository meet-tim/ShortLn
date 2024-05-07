import { Module } from '@nestjs/common';
import { UrlsController } from './urls.controller';
import { UrlsService } from './urls.service';
import { urlsSchema, Url } from "./schemas/urls.schema" 
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: "Url", schema: urlsSchema }])],
  controllers: [UrlsController],
  providers: [UrlsService]
})
export class UrlsModule {}



