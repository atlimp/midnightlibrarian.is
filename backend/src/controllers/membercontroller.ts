import { GET_MEMBERS, GET_MEMBER, INSERT_MEMBER, GET_INSERTED_MEMBER, UPDATE_MEMBER, DELETE_MEMBER } from '../db/queries';
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

    async memberExists(id: number): Promise<boolean> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_MEMBER, { $id: id });
        db.close();

        if (result) return true;

        return false;
    }

    async createMember(member: Member): Promise<Member> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            const params = {
                $name: member.name,
                $role: member.role,
                $description: member.description,
                $image: member.image,
            };
    
            await db.run(INSERT_MEMBER, params);

            const [ result ] = await db.get(GET_INSERTED_MEMBER);
        
            await db.commitTransaction();

            return {
                id: result.id,
                name: result.name,
                role: result.role,
                description: result.description,
                image: result.image,
            } as Member;
        } catch (e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }
    }

    async updateMember(member: Member): Promise<Member> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            const params = {
                $id: member.id,
                $name: member.name,
                $role: member.role,
                $description: member.description,
                $image: member.image,
            };
    
            await db.run(UPDATE_MEMBER, params);

            const [ result ] = await db.get(GET_MEMBER, { $id: member.id });
        
            await db.commitTransaction();
            
            return {
                id: result.id,
                name: result.name,
                role: result.role,
                description: result.description,
                image: result.image,
            } as Member;
        } catch (e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }
    }

    async deleteMember(id: number): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        try {

            await db.beginTransaction();

            await db.run(DELETE_MEMBER, { $id: id });
            
            await db.commitTransaction();
        } catch (e) {
            await db.rollbackTransaction()
            throw e;
        } finally {
            db.close();
        }
    }
}

export default MemberController;