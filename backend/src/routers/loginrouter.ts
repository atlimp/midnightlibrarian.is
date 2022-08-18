import express, { Request, Response, Router } from 'express';
import { IBaseRouter } from '../interfaces/interfaces';
import { catchAllErrors } from '../util/util';
import Login from '../model/login';
import LoginController from '../controllers/logincontroller';

class LoginRouter implements IBaseRouter {

    path = '/login';

    router: Router = express.Router();
    
    constructor() {
        this.initMiddleware();
        this.initRoutes();
    }

    initRoutes() {
        this.router.post('/', catchAllErrors(this.login));
    }

    initMiddleware() {
    }
    
    async login(req: Request, res: Response) {
        const login = req.body as Login;

        const controller = new LoginController();
        const result = await controller.login(login);

        return res.status(200).json(result);
    }
}

export default LoginRouter;