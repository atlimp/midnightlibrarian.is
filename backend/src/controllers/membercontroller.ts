import { GET_MEMBERS, GET_MEMBER, INSERT_MEMBER } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import Member from '../model/member';
import DatabaseService from '../services/databaseservice';

class MemberController implements IBaseController {

    async getAllMembers(): Promise<Member[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_MEMBERS);
        db.close();

        return result.map((x: any) => {
            return {
                id: x.id,
                name: x.name,
                role: x.role,
                description: x.description,
                image: x.image,
            } as Member;
        });
    }

    async getMember(id: number): Promise<Member> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_MEMBER, { $id: id });
        db.close();

        if (!result) throw new NotFoundException(`Member ${id}`);

        return {
            id: result.id,
            name: result.name,
            role: result.role,
            description: result.description,
            image: result.image,
        } as Member;
    }

    async createMember(member: Member): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        const params = {
            $name: member.name,
            $role: member.role,
            $description: member.description,
            $image: member.image,
        };

        await db.run(INSERT_MEMBER, params);

        db.close();
    }

    async updateMember(member: Member): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        const params = {
            $name: member.name,
            $role: member.role,
            $description: member.description,
            $image: member.image,
        };

        await db.run(INSERT_MEMBER, params);

        db.close();
    }
}

export default MemberController;