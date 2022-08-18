import express, { Request, Response, Router } from 'express';
import MemberController from '../controllers/membercontroller';
import { IBaseRouter } from '../interfaces/interfaces';
import { validate } from '../middleware/validationmiddleware';
import Member from '../model/member';
import { catchAllErrors } from '../util/util';
import { authenticate } from '../middleware/authenticationmiddleware';

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
        this.router.post('/', catchAllErrors(authenticate), Member.validation('POST'), catchAllErrors(validate), catchAllErrors(this.createMember));
        this.router.put('/', catchAllErrors(authenticate), Member.validation('PUT'), catchAllErrors(validate), catchAllErrors(this.updateMember));
        this.router.delete('/:id', catchAllErrors(authenticate), Member.validation('DELETE'), catchAllErrors(validate), catchAllErrors(this.deleteMember));
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

    async createMember(req: Request, res: Response) {
        const { 
            name,
            role,
            description,
            image,
        } = req.body;

        const controller = new MemberController();

        const result = await controller.createMember({ name, role, description, image } as Member);

        return res.status(200).json(result);
    }

    async updateMember(req: Request, res: Response) {
        const { 
            id,
            name,
            role,
            description,
            image,
        } = req.body;

        const controller = new MemberController();

        const result = await controller.updateMember({ id, name, role, description, image } as Member);

        return res.status(200).json(result);
    }

    async deleteMember(req: Request, res: Response) {
        const { id } = req.params;

        const controller = new MemberController();

        await controller.deleteMember(Number(id));

        return res.status(204).send();
    }
}

export default MemberRouter;