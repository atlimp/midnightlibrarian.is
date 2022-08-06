import express, { Request, Response, Router } from 'express';
import LinksController from '../controllers/linkscontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class LinksRouter implements IBaseRouter {

    path = '/links';

    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', catchAllErrors(this.getAllLinks));
        this.router.get('/active', catchAllErrors(this.getActiveLinks));
        this.router.get('/:site', catchAllErrors(this.getLink));
    }

    initMiddleware() {
    }
    
    async getAllLinks(req: Request, res: Response) {
        const controller = new LinksController();

        const result = await controller.getAllLinks();

        return res.status(200).json(result);
    }

    async getActiveLinks(req: Request, res: Response) {
        const controller = new LinksController();

        const result = await controller.getActiveLinks();

        return res.status(200).json(result);
    }

    async getLink(req: Request, res: Response) {
        const { site } = req.params;

        const controller = new LinksController();

        const result = await controller.getLink(site as string);

        return res.status(200).json(result);
    }
}

export default LinksRouter;