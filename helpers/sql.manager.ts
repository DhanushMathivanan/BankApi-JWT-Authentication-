import { sequelize } from '../config/db.config';
import * as SqlConnection from 'sequelize';

export class SqlManger {

    private _sequelize: SqlConnection.Sequelize;

    constructor() {
        this._sequelize = sequelize.getSequelize();       
    }

    public InitiateTransaction() {
        return this._sequelize.transaction();
    }

    public getSequelize() {
        return this._sequelize;
    }

    public ExecuteQuery(qry: string) {
        return this._sequelize.query(qry, { type: SqlConnection.QueryTypes.SELECT });
    }

   

    public UpdateTransaction(qry: string, vals: any, _transaction): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.UPDATE, transaction: _transaction });
    }

    public ExecuteQueryWithTransaction(qry: string, vals: any, _transaction): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.SELECT, transaction: _transaction });
    }

    

    public InsertTransaction(qry: string, vals: any, _transaction): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.INSERT, transaction: _transaction });
    }

    public DeleteTransaction(qry: string, vals: any, _transaction): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.DELETE, transaction: _transaction });
    }

    public BulkInsertTransaction(tableName: string, vals: any, _transaction): any {
        return this._sequelize.getQueryInterface().bulkInsert(tableName, vals,
            { type: SqlConnection.QueryTypes.INSERT, transaction: _transaction })
    }

    public Get(qry: string, vals: any = {}): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.SELECT });
    }
    public Insert(qry: string, vals: any): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.INSERT });
    }
    public Update(qry: string, vals: any): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.UPDATE });
    }
    public BulkInsert(tableName: string, vals: any): any {
        return this._sequelize.getQueryInterface().bulkInsert(tableName, vals)
    }

    public BulkUpdate(qry: string, vals: any): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.BULKUPDATE });
    }

    public Delete(qry: string, vals: any): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.DELETE });
    }

    public BulkDelete(qry: string, vals: any): any {
        return this._sequelize.query({
            query: qry,
            values: vals
        }, { type: SqlConnection.QueryTypes.BULKDELETE });
    }
}

