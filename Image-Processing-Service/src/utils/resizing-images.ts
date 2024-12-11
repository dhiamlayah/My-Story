import path from "path";
import * as fs from 'fs';
import sharp from "sharp";

export async function resizeImage(file: Express.Multer.File, size: { width?: number, height?: number }, userId?: string) {
    let uploadDir = path.join(__dirname, '..', '..', 'uploads');
  
    if (!userId) {
        uploadDir = uploadDir + "/visiter"
    } else {
        uploadDir = uploadDir + "/" + userId
    }
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }
    try {
        let imageInformation                                    //store the image metadata on it  
        const filename = `${Date.now()}-${file.originalname}`;  //give the file a name 
        const filepath = path.join(uploadDir, filename);
        await sharp(file.buffer).resize(size).toFile(filepath).then((data) => { imageInformation = data })
        return imageInformation
    } catch (error: any) {
        throw new Error("error in resizing image")
    }


}