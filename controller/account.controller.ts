import { Request, Response, NextFunction } from 'express';
import { AccountManager } from "../datamanger/account.manager";
import { Api, ValidatorHelper } from '../helpers/index';
import { AccountSchema } from '../validatorschema/account.schema';

export class AccountController {

    public transferAmount = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validator = new ValidatorHelper();
            const schema = new AccountSchema();
            const manager = new AccountManager();
            const validReq = await validator.jsonValidator(schema.AmountTransferSchema(), request.body);
            const result = await manager.transferAmount(validReq);
            Api.ok(request, response, { transactionInfo: result });

        } catch (error) {
            Api.serverError(request, response, error);
        }
    }

    public getAccountBalance = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validator = new ValidatorHelper();
            const schema = new AccountSchema();
            const manager = new AccountManager();
            const validReq = await validator.jsonValidator(schema.AcountInfoSchema(), request.body);
            const balance = await manager.getAccountBalance(validReq['AccountID']);
            Api.ok(request, response, { accountInfo: balance });
        } catch (error) {
            Api.serverError(request, response, error);
        }
    }
    public getTransactionHistory = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validator = new ValidatorHelper();
            const schema = new AccountSchema();
            const manager = new AccountManager();
            const validReq = await validator.jsonValidator(schema.AcountTransactionInfoSchema(), request.body);
            const transactionHistory = await manager.getTransactionHistory(validReq['AccountID']);
            Api.ok(request, response, { transactionLogInfo: transactionHistory });
        } catch (error) {
            Api.serverError(request, response, error);
        }
    }

}
