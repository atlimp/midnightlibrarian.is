import { DELETE_RELEASE_LINKS, GET_ALL_ACTIVE_RELEASES, GET_ALL_RELEASES, GET_INSERTED_RELEASE, GET_RELEASE, GET_RELEASE_LINKS, INSERT_RELEASE, INSERT_RELEASE_LINK, UPDATE_RELEASE, DELETE_RELEASE } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import Release from '../model/release';
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

    async releaseExists(id: number): Promise<boolean> {
        const db: DatabaseService = new DatabaseService();
        
        const [ result ] = await db.get(GET_RELEASE, { $id: id });
        db.close();
        
        if (result) return true;

        return false;
    }

    async createRelease(release: Release): Promise<Release> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            const params = {
                $name: release.name,
                $description: release.description,
                $type: release.type,
                $image: release.image,
                $active: release.active,
                $release_date: release.releaseDate,
            }

            await db.run(INSERT_RELEASE, params);

            const [ result ] = await db.get(GET_INSERTED_RELEASE);

            if (release.links.length > 0) {
                await Promise.all(release.links.map((x) => {
                    db.run(INSERT_RELEASE_LINK, { $release: result.id, $site: x.site, $link: x.link });
                }));          
            }

            const releaseLinks = await db.get(GET_RELEASE_LINKS, { $release: result.id });
            
            await db.commitTransaction();

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
        } catch (e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }
    }

    async updateRelease(release: Release): Promise<Release> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            const params = {
                $id: release.id,
                $name: release.name,
                $description: release.description,
                $type: release.type,
                $image: release.image,
                $active: release.active,
                $release_date: release.releaseDate,
            }

            await db.run(UPDATE_RELEASE, params);

            const [ result ] = await db.get(GET_RELEASE, { $id: release.id });

            await db.run(DELETE_RELEASE_LINKS, { $release: release.id });

            if (release.links.length > 0) {
                await Promise.all(release.links.map((x) => {
                    db.run(INSERT_RELEASE_LINK, { $release: result.id, $site: x.site, $link: x.link });
                }));          
            }

            const releaseLinks = await db.get(GET_RELEASE_LINKS, { $release: result.id });
            
            await db.commitTransaction();

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
        } catch (e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }
    }

    async deleteRelease(id: number): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            await db.run(DELETE_RELEASE, { $id: id });
            await db.run(DELETE_RELEASE_LINKS, { $release: id });
            
            await db.commitTransaction();
        } catch(e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }
    }
}

export default ReleaseController;