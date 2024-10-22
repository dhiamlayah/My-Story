import { Controller, Get } from '@nestjs/common';

@Controller('image-processing')
export class ImageProcessingController {
    @Get('/')
    getImage(){
        return "Image"
    }
    
}
