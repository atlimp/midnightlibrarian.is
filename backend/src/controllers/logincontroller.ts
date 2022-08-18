import { GET_HASH } from '../db/queries';
import { IBaseController } from '../interfaces/interfaces';
import Token from '../model/token';
import Login from '../model/login';
import DatabaseService from '../services/databaseservice';
import bcrypt from 'bcrypt';
import UnauthorizedException from '../exceptions/unauthorizedexception';
import { generateToken } from '../services/authenticationservice';
import { getConfigOrDefault } from '../util/util';

class LinksController implements IBaseController {

    async login(login: Login): Promise<Token> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_HASH, { $username: login.username });
        db.close();

        if (result) {
            const match = await bcrypt.compare(login.password, result.hash);

            if (match) {
                const tokenLifeTimeSeconds = getConfigOrDefault('JWT_TOKEN_LIFETIME', 3600, (x) => Number(x));
                const expiresAt = new Date();
                expiresAt.setSeconds(expiresAt.getSeconds() + tokenLifeTimeSeconds);
                const token = generateToken(login.username, tokenLifeTimeSeconds);

                return {
                    token,
                    expiresAt
                } as Token;
            }
        }

        throw new UnauthorizedException('Username or password is invalid');
    }
}

export default LinksController;