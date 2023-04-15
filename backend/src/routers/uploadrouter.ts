import express, { Request, Response, Router } from 'express';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors, getConfigOrDefault } from '../util/util';
import { authenticate } from '../middleware/authenticationmiddleware';
import multer, { FileFilterCallback, Multer } from 'multer';
import BadRequestException from '../exceptions/badrequestexception';

class UploadRouter implements IBaseRouter {
    
    path = '/upload';
    
    router: Router = express.Router();

    upload: Multer;

    mimeTypes = [
        'image/jpg',
        'image/jpeg',
        'image/png',
    ];
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }
    
    initRoutes() {
        this.router.post('/image', catchAllErrors(authenticate), this.upload.any(), catchAllErrors(this.uploadImage));
    }
    
    initMiddleware() {
        const storage = multer.diskStorage({
            destination: (req: Request, file: Express.Multer.File, cb) => {
                cb(null, 'uploads/');
            },
            filename: (req: Request, file: Express.Multer.File, cb) => {
                cb(null, file.originalname);
            },
        });

        const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
            if (!this.mimeTypes.find(x => x === file.mimetype)) {
                return cb(new BadRequestException([ `Invalid mimetype for file ${file.fieldname}: ${file.originalname}` ]));
            }

            cb(null, true);
        };

        this.upload = multer({ storage, fileFilter });
    }
    
    async uploadImage(req: Request, res: Response) {
        let files: any | Express.Multer.File[] = req.files;

        if (!Array.isArray(files))
            files = [];

        const urls = files.map((file: Express.Multer.File) => {
            return `${getConfigOrDefault('BASE_URL', '')}/${file.filename}`;
        });

        return res.status(200).json({ urls });
    }
}

export default UploadRouter;