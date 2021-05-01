import { Request, Response, NextFunction } from 'express';
import { CustomerManger } from "../datamanger/customer.manager";
import { Api, ValidatorHelper } from '../helpers/index';
import { CustomerSchema } from '../validatorschema/customer.schema';
import { ResponseMessages, BankAccountConfigMessages } from '../constants/messageconstant';

export class CustomerController {

    public getCustomers = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validator = new ValidatorHelper();
            const schema = new CustomerSchema();
            const customers = await new CustomerManger().getCustomers();
            console.log(customers);
            const validRes = await validator.jsonValidator(schema.GetCustomerSchema(), customers);
            Api.ok(request, response, { customerInfo: validRes });
        } catch (error) {
            Api.serverError(request, response, error);
        }

    };

    public createCustomer = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const validator = new ValidatorHelper();
            const schema = new CustomerSchema();
            const manager = new CustomerManger();
            const validReq = await validator.jsonValidator(schema.CreateCustomerSchema(), request.body);
            if (validReq['Amount'] < BankAccountConfigMessages.MIN_ACT_BAL) {
                Api.ok(request, response, { message: ResponseMessages.CUS_MIN_AMT_ADD });
            }
            const respToken = await manager.createCustomer(validReq);
            Api.ok(request, response, { customerInfo: respToken, message: ResponseMessages.CUS_ADD });
        } catch (error) {
            Api.serverError(request, response, error);
        }

    }

}
