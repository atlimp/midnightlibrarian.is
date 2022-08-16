import { GET_ALL_ACTIVE_LINKS, GET_ALL_LINKS, GET_LINK, INSERT_LINK, UPDATE_LINK } from '../db/queries';
import NotFoundException from '../exceptions/notfoundexception';
import { IBaseController } from '../interfaces/interfaces';
import Link from '../model/link';
import DatabaseService from '../services/databaseservice';

class LinksController implements IBaseController {

    async getAllLinks(): Promise<Link[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_ALL_LINKS);
        db.close();

        return result.map((x: any) => {
            return {
                site: x.site,
                link: x.link,
                svg: x.svg,
                active: x.active === 1,
            } as Link;
        });
    }

    async getActiveLinks(): Promise<Link[]> {
        const db: DatabaseService = new DatabaseService();

        const result = await db.get(GET_ALL_ACTIVE_LINKS);
        db.close();

        return result.map((x: any) => {
            return {
                site: x.site,
                link: x.link,
                svg: x.svg,
                active: x.active === 1,
            } as Link;
        });
    }

    async getLink(site: string): Promise<Link> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_LINK, { $site: site });
        db.close();

        if (!result) throw new NotFoundException(`Link ${site}`);

        return {
            site: result.site,
            link: result.link,
            svg: result.svg,
            active: result.active === 1,
        } as Link;
    }

    async createLink(link: Link): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        const params = {
            $site: link.site,
            $link: link.link,
            $svg: link.svg,
            $active: link.active,
        };
        
        await db.run(INSERT_LINK, params);

        db.close();
    }

    async updateLink(link: Link): Promise<void> {
        const db: DatabaseService = new DatabaseService();

        const params = {
            $site: link.site,
            $link: link.link,
            $svg: link.svg,
            $active: link.active,
        };
        
        await db.run(UPDATE_LINK, params);
    }
}

export default LinksController;