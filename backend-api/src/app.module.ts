import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(),AuthModule, UsersModule,MongooseModule.forRoot("mongodb+srv://root:H8MJNsccST0VItQF@cluster0.u5l6qfc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")],
  controllers: [AppController],
  providers: [AppService, UsersService],
})
export class AppModule {}
