import { SqlManger } from '../helpers/sql.manager';
import { SelectQuery, InsertQuery, UpdateQuery } from '../queries';
const jwt = require('jsonwebtoken');

export class CustomerManger {

    public async getCustomers() {
        try {
            const customers = await new SqlManger().Get(SelectQuery.getCustomers);
            return customers;
        } catch (error) {
            throw (error)
        }
    }

    public async createCustomer(customer: any) {
        const sqlManager = new SqlManger();
        const transaction = await sqlManager.InitiateTransaction();
        try {
            const customerId = Number(Math.floor(Math.random() * 10000000000));
            customer.CustomerID = customerId;
            await sqlManager.InsertTransaction(InsertQuery.createCustomer, customer, transaction);
            if (customer.WithInBank === false) {
                customer.Amount = null;
            }
            await sqlManager.InsertTransaction(InsertQuery.createAccount, customer, transaction);
            const token = jwt.sign(
                { customerId: customer.CustomerID },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
            await transaction.commit();
            return { customerId: customerId, token: token };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}