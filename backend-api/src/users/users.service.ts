import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';


@Injectable()
export class UsersService {
  
    constructor(@InjectModel("User") private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userModel.findOne({email}).exec();
    if (!user) {
      throw new NotFoundException(`User with id ${email} not found`);
    }
    return user;
  }

  async AddUser(user:User): Promise<User>{
    const createdUser = new this.userModel(user)
    return createdUser.save();
  }
}