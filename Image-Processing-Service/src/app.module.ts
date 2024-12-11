import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageProcessingModule } from './image-processing/image-processing.module';
import { ActuatorController } from './actuator-controller/actuator-controller.controller';

@Module({
  imports: [ImageProcessingModule],
  controllers: [AppController, ActuatorController],
  providers: [AppService],
})
export class AppModule {}
