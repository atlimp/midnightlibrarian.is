import { GET_ALL_ACTIVE_RELEASES, GET_ALL_RELEASES, GET_RELEASE, GET_RELEASE_LINKS, GET_RELEASE_TYPES } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import Release from '../model/release';
import ReleaseType from '../model/releasetype';
import DatabaseService from '../services/databaseservice';

class ReleaseController implements IBaseController {

    async getAllReleases(): Promise<Release[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_ALL_RELEASES);
        
        const response = Promise.all(result.map(async (x: any) => {
            const releaseLinks = await db.get(GET_RELEASE_LINKS, { $release: x.id });

            return {
                id: x.id,
                name: x.name,
                description: x.description,
                links: releaseLinks,
                type: x.type,
                image: x.image,
                active: x.active === 1,
                releaseDate: x.release_date,
            } as Release;
        }));

        db.close();

        return response;
    }

    async getActiveReleases(): Promise<Release[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_ALL_ACTIVE_RELEASES);

        const response = Promise.all(result.map(async (x: any) => {
            const releaseLinks = await db.get(GET_RELEASE_LINKS, { $release: x.id });

            return {
                id: x.id,
                name: x.name,
                description: x.description,
                links: releaseLinks,
                type: x.type,
                image: x.image,
                active: x.active === 1,
                releaseDate: x.release_date,
            } as Release;
        }));

        db.close();

        return response;
    }
    
    async getRelease(id: number): Promise<Release> {
        const db: DatabaseService = new DatabaseService();
        
        const [ result ] = await db.get(GET_RELEASE, { $id: id });
        
        if (!result) throw new NotFoundException(`Release ${id}`);
        
        const releaseLinks = await db.get(GET_RELEASE_LINKS, { $release: result.id });
        
        db.close();
        
        return {
            id: result.id,
            name: result.name,
            description: result.description,
            type: result.type,
            links: releaseLinks,
            image: result.image,
            active: result.active === 1,
            releaseDate: result.release_date,
        } as Release;
    }

    async getReleaseTypes(): Promise<ReleaseType[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_RELEASE_TYPES);
        db.close();

        const response = result.map((x: any) => {
            return {
                id: x.id,
                type: x.type,
            } as ReleaseType;
        });

        return response;
    }
}

export default ReleaseController;