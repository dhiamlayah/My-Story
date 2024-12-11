import path from "path";
import * as fs from 'fs';
import sharp from "sharp";

interface ImageResized {
    width : number,
    height : number,
    path:string,
    filename  : string ,
    date : Date
}

export async function resizeImage(file: Express.Multer.File, size: { width?: number, height?: number }, userId?:string) : Promise<ImageResized> {
    let uploadDir = path.join(__dirname, '..', '..', 'uploads',`${userId?userId:"visiter"}`);   // folder path 
    !fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir, { recursive: true });                  //check folder exist or create new one 
    try {
        const filename = `${Date.now()}-${file.originalname}`;                                  //give the file a name 
        const filepath = path.join(uploadDir, filename);
        const image =  sharp(file.buffer)
        let imageResized : ImageResized
        await image.metadata().then((metadata)=>{
            if(metadata.width>size.width || metadata.height>size.height){
                image.resize(400)
            }
            return image.toFile(`${filepath}`)
        }).then((imageData)=>{
             imageResized = {
                width:imageData.width,
                height:imageData.height,
                path:filepath,
                filename : filename,
                date:new Date()              
            }
        })
        return imageResized
    } catch (error: unknown) {
        throw new Error(`Error in Resizing Image ${error}`)
    }


}