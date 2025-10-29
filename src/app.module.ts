import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';




@Module({
  imports: [AuthModule, UserModule
    ,ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI!)
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
