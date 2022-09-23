import express, { Request, Response, Router } from 'express';
import LinksController from '../controllers/linkscontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';
import Link from '../model/link';
import { validate } from '../middleware/validationmiddleware';
import { authenticate } from '../middleware/authenticationmiddleware';

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
        this.router.post('/', catchAllErrors(authenticate), Link.validation('POST'), catchAllErrors(validate), catchAllErrors(this.createLink));
        this.router.put('/', catchAllErrors(authenticate), Link.validation('PUT'), catchAllErrors(validate), catchAllErrors(this.updateLink));
        this.router.delete('/:site', catchAllErrors(authenticate), Link.validation('DELETE'), catchAllErrors(validate), catchAllErrors(this.deleteLink));
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

    async createLink(req: Request, res: Response) {
        const {
            site,
            link,
            svg,
            active,
        } = req.body;

        const controller = new LinksController();

        const result = await controller.createLink({ site, link, svg, active } as Link);

        return res.status(200).json(result);
    }

    async updateLink(req: Request, res: Response) {
        const {
            id,
            site,
            link,
            svg,
            active,
        } = req.body;

        const controller = new LinksController();

        const result = await controller.updateLink({ id, site, link, svg, active } as Link);

        return res.status(200).json(result);
    }

    async deleteLink(req: Request, res: Response) {
        const { site } = req.params;

        const controller = new LinksController();

        await controller.deleteLink(site);

        return res.status(204).send();
    }
}

export default LinksRouter;