import { client } from './utils/eurekaConnection';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { Eureka } from 'eureka-js-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // If uploads folder not exist, create one
  const uploadDir = join(process.cwd(), 'uploads');
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  // Configure Eureka Client
  const Eurekaclient = client;

  // Start the Eureka client
  client.start((error) => {
    if (error) {
      console.error('Error connecting to Eureka server:', error);
    } else {
      console.log('Successfully registered with Eureka server');
    }
  });

  console.log(`Server running on port ${process.env.PORT ?? 3001}`);
  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
