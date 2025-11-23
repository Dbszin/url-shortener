import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinkModule } from './link/link.module';
import { Link } from './link/entities/link.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Link], 
      synchronize: true,
    }),
    LinkModule, 
  ],
  controllers: [AppController], 
  providers: [AppService],
})
export class AppModule {}