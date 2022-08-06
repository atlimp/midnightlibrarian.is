import express, { Request, Response, Router } from 'express';
import ReleasesController from '../controllers/releasescontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class ReleasesRouter implements IBaseRouter {

    path = '/releases';

    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', catchAllErrors(this.getAllReleases));
        this.router.get('/active', catchAllErrors(this.getActiveReleases));
        this.router.get('/:id', catchAllErrors(this.getRelease));
    }

    initMiddleware() {
    }
    
    async getAllReleases(req: Request, res: Response) {
        const controller = new ReleasesController();

        const result = await controller.getAllReleases();

        return res.status(200).json(result);
    }

    async getActiveReleases(req: Request, res: Response) {
        const controller = new ReleasesController();

        const result = await controller.getActiveReleases();

        return res.status(200).json(result);
    }

    async getRelease(req: Request, res: Response) {
        const { id } = req.params;

        const controller = new ReleasesController();

        const result = await controller.getRelease(Number(id));

        return res.status(200).json(result);
    }
}

export default ReleasesRouter;