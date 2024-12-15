import { Controller, Get } from '@nestjs/common';

@Controller('actuator')
export class ActuatorController {
  @Get('info')
  getInfo() {
    return { status: 'UP', app: 'nestjs-app' };
  }
}
