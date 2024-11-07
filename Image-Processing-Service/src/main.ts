import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe()
  )
  
  //if uploads folder not exist create one 
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }


  console.log(`server run on port ${process.env.PORT ?? 3000} ====> `)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
