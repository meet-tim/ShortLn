import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './Dtos/createUserDto';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { loginDto } from './Dtos/loginDto';



@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(dto: loginDto): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(dto.email);
    const isMatch = await bcrypt.compare(dto.password, user?.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.firstname, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(dto: CreateUserDto) {
    const newUser = new User();
    newUser.firstname = dto.firstname;
    newUser.lastname = dto.lastname;
    newUser.email = dto.email;
    newUser.password = await bcrypt.hash(dto.password, 10);

    try{
      const user = await this.usersService.AddUser(newUser);
    }catch(error){
      if (error.code ===11000){
        throw new BadRequestException('Email address already exists');
      }
    }
  }
}