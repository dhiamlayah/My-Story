import { Injectable } from '@nestjs/common';
import { resizeImage } from 'src/utils/resizing-images';


@Injectable()
export class ImageProcessingService {
    async UploadeImage (file : Express.Multer.File ,id : string){
        const imageData = await resizeImage(file,{width:400,height:400},id)
        return imageData
    }
}
