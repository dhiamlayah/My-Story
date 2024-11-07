import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ImageProcessingService } from './image-processing.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('image-processing')
export class ImageProcessingController {

    constructor(private imageProcessingService: ImageProcessingService) { }

    @Post('/upload-image')
    @UseInterceptors(FileInterceptor('file', {
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
                cb(null, true);
            } else {
                cb(new Error('Only images are allowed...'), false);
            }
        }
    }))
    async UplodeImage(@UploadedFile() file: Express.Multer.File, @Body('id') id: string) {
        return await this.imageProcessingService.UploadeImage(file, id)
    }

}


