import {Request, Response} from "express";
import { CustomerController }  from '../controller/customer.controller';
import { AccountController }  from '../controller/account.controller';

export class Routes {
    public customerController:CustomerController = new CustomerController();
    public accountController:AccountController = new AccountController();
    public routes(app): void {

        
        app.route('/').get((req: Request, res: Response)=>{
            res.status(200).send({
                message: 'API Server running'
            })
        });

        app.route('/customers').get(this.customerController.getCustomers);
        app.route('/customers/create').post(this.customerController.createCustomer);
        app.route('/account/transfer').post(this.accountController.transferAmount);
        app.route('/account/balance').get(this.accountController.getAccountBalance);
        app.route('/account/transactionHistory').get(this.accountController.getTransactionHistory);
    }
}
