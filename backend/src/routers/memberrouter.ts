import express, { Request, Response, Router } from 'express';
import MemberController from '../controllers/membercontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';

class MemberRouter implements IBaseRouter {

    path = '/members';

    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/', catchAllErrors(this.getAllMembers));
        this.router.get('/:id', catchAllErrors(this.getMember));
    }

    initMiddleware() {
    }
    
    async getAllMembers(req: Request, res: Response) {
        const controller = new MemberController();

        const result = await controller.getAllMembers();

        return res.status(200).json(result);
    }

    async getMember(req: Request, res: Response) {
        const { id } = req.params;

        const controller = new MemberController();

        const result = await controller.getMember(Number(id));

        return res.status(200).json(result);
    }
}

export default MemberRouter;