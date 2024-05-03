import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UUID } from 'mongodb';
import { Date, HydratedDocument } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type UserDocument = HydratedDocument<User>;
const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
@Schema()
export class User {
  @Prop({ default: uuidv4,type:UUID })
  userId: string;
  
  @Prop({ required: true ,unique:true,match:emailRegExp, type:String})
  email: string;

  @Prop({ required: true , type:String})
  password: string;

  @Prop({ required: true , type:String})
  firstname: string;

  @Prop({ required: true , type:String})
  lastname: string;

  @Prop({ default: Date.now ,type: Date})
  createdAt: Date

}

export const userSchema = SchemaFactory.createForClass(User);