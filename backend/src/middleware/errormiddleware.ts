import { NextFunction, Request, Response } from 'express';
import { isHttpException } from '../util/util';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function errorMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
    let status = 500;
    let message = 'Something went wrong';

    if (isHttpException(error)) {
        status = error.status;
        message = error.message;
    }

    console.error(req.path, req.method, error);

    res.status(status).json({ status, message });
}