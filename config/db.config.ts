// import * as mysql from 'mysql';
import * as SqlConnection from 'sequelize';

 

export class SequelizeConfig {
    private sequelize: SqlConnection.Sequelize;
     public setConnection() {
        this.sequelize = new SqlConnection.Sequelize('BankDB', null, null, {
                    host: 'localhost',
                    logging: true,
                    dialect: 'sqlite',
                    storage: './DB/BankDB.db'
                });
                console.log('Db Connected..................');
    }
    public getSequelize() {
        return this.sequelize;
    }
}
export const sequelize = new SequelizeConfig();


