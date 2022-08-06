import { IBaseService } from '../interfaces/interfaces';
import { getConfigOrDefault } from '../util/util';
import sqlite3, { Database } from 'sqlite3';
sqlite3.verbose();

class DatabaseService implements IBaseService {

    dbFile = '';
    
    db: Database | null = null;

    constructor() {
        this.dbFile = getConfigOrDefault('DATABASE_FILE', '');
        this.db = new sqlite3.Database(this.dbFile);
    }

    get(query: string, params: object = {}): Promise<any[]> {
        const promise: Promise<any[]> = new Promise((resolve, reject) => {
            this.db?.all(query, params, (err, rows) => {
                
                if (err) {
                    reject(err);
                }

                resolve(rows);
            });
        });
        
        return promise;
    }

    close() {
        this.db?.close();
    }
}

export default DatabaseService;