import { GET_CONFIG, UPDATE_CONFIG } from '../db/queries';
import { IBaseController } from '../interfaces/interfaces';
import Config from '../model/config';
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

    async updateConfig(config: Config): Promise<Config> {
        const db: DatabaseService = new DatabaseService();

        try {
            await db.beginTransaction();

            const params = {
                $doi_date: config.doi.date,
                $doi_message: config.doi.message,
                $doi_countdown: config.doi.countdown,
                $motd: config.motd,
                $show_additional_content: config.showAdditionalContent,
                $config_id: 1,
            };
    
            await db.run(UPDATE_CONFIG, params);
    
            const [ result ] = await db.get(GET_CONFIG, { $configId: 1 });
            
            await db.commitTransaction();

            return {
                doi: {
                    date: result.doi_date,
                    message: result.doi_message,
                    countdown: result.doi_countdown === 1,
                },
                motd: result.motd,
                showAdditionalContent: result.show_additional_content === 1,
            } as Config;
        } catch (e) {
            await db.rollbackTransaction();
            throw e;
        } finally {
            db.close();
        }

    }
}

export default ConfigController;