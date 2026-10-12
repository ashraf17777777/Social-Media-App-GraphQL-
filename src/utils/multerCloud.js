import multer, { diskStorage } from 'multer';


export function uploadCloud(){
    const storage =diskStorage({});

    return multer({storage})
}
