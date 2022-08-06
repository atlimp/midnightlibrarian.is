import express, { Request, Response, Router } from 'express';
import QuoteController from '../controllers/quotecontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class QuoteRouter implements IBaseRouter {

    path = '/quote';

    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/random', catchAllErrors(this.getRandomQuote));
    }

    initMiddleware() {
    }
    
    async getRandomQuote(req: Request, res: Response) {
        const controller = new QuoteController();

        const result = await controller.getRandomQuote();

        return res.status(200).json(result);
    }
}

export default QuoteRouter;