import express, { Request, Response, Router } from 'express';
import ReleasesController from '../controllers/releasescontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { validate } from '../middleware/validationmiddleware';
import Release from '../model/release';
import { catchAllErrors } from '../util/util';
import { authenticate } from '../middleware/authenticationmiddleware';

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
        this.router.post('/', catchAllErrors(authenticate), Release.validation('POST'), catchAllErrors(validate), catchAllErrors(this.createRelease));
        this.router.put('/', catchAllErrors(authenticate), Release.validation('PUT'), catchAllErrors(validate), catchAllErrors(this.updateRelease));
        this.router.delete('/:id', catchAllErrors(authenticate), Release.validation('DELETE'), catchAllErrors(validate), catchAllErrors(this.deleteRelease));
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

    async createRelease(req: Request, res: Response) {
        const release = req.body;

        const controller = new ReleasesController();

        const result = await controller.createRelease(release);

        return res.status(200).json(result);
    }

    async updateRelease(req: Request, res: Response) {
        const release = req.body;

        const controller = new ReleasesController();

        const result = await controller.updateRelease(release);

        return res.status(200).json(result);
    }

    async deleteRelease(req: Request, res: Response) {
        const { id } = req.params;

        const controller = new ReleasesController();

        const result = await controller.deleteRelease(Number(id));

        return res.status(204).send();
    }
}

export default ReleasesRouter;