import { GET_CONFIG } from '../db/queries';
import { IBaseController, Config } from '../interfaces/interfaces';
import DatabaseService from '../services/databaseservice';

class ConfigController implements IBaseController {

    async getConfig(): Promise<Config> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_CONFIG, { $configId: 1 });

        db.close();

        return {
            doi: {
                date: result.doi_date,
                message: result.doi_message,
                countdown: result.doi_countdown === 1,
            },
            motd: result.motd,
            showAdditionalContent: result.show_additional_content === 1,
        } as Config;
    }
}

export default ConfigController;