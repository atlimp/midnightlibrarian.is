import express, { Request, Response, Router } from 'express';
import ConfigController from '../controllers/configcontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class ConfigRouter implements IBaseRouter {

    path = '/config';
    
    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', catchAllErrors(this.getConfig));
        this.router.put('/', catchAllErrors(this.updateConfig));
    }

    initMiddleware() {
    }
    
    async getConfig(req: Request, res: Response) {
        const controller = new ConfigController();

        const result = await controller.getConfig();

        return res.status(200).json(result);
    }

    async updateConfig(req: Request, res: Response) {
        const controller = new ConfigController();

        const config = req.body;

        const result = await controller.updateConfig(config);

        return res.status(200).json(result);
    }
}

export default ConfigRouter;