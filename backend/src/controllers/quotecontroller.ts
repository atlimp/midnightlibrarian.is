import { GET_RANDOM_QUOTE } from '../db/queries';
import { IBaseController, Quote } from '../interfaces/interfaces';
import DatabaseService from '../services/databaseservice';

class QuoteController implements IBaseController {

    async getRandomQuote(): Promise<Quote> {
        const db: DatabaseService = new DatabaseService();

        const [ result ] = await db.get(GET_RANDOM_QUOTE);
        db.close();

        return result;
    }
}

export default QuoteController;