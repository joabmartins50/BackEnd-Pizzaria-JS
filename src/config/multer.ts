import crypto from 'crypto';
import Multer from "multer";

import { extname, resolve } from 'path'

export default{
    upload(folder: string){
        return{
            storage: Multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) =>{
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`

                    return callback(null, fileName)
                }
            })
        }
    }
}