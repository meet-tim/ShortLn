import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { Date, HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UrlDocument = HydratedDocument<Url>;

@Schema()
export class Url {
  @Prop({ default: uuidv4,type:UUID })
  urlId: string;
  
  @Prop({ required: true ,unique:true, type:String})
  longUrl: string;
 
  @Prop({ required: true ,unique:true, type:String})
  shortenedUrl: string;

  @Prop({require:true,unique:true, type:String})
  shortCode

  @Prop({ required: true , type:String})
  owner: string;
}

export const urlsSchema = SchemaFactory.createForClass(Url);