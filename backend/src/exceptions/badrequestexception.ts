import HttpException from './httpexception';

class BadRequestException extends HttpException {
    constructor(msg: string[]) {
        if (msg.length === 1)
            super(400, msg[0]);
        else
            super(400, msg.reduce((u, k) => u += `${k} `, ''));
    }
}

export default BadRequestException;