import * as  joi from 'joi';

export class AccountSchema {
    public AmountTransferSchema() {
        return joi.object({
            TransactionID: joi.number().required(),
            DebitAccountID: joi.number().required(),
            CreditAccountID: joi.number().required(),
            CreditAmount: joi.number().required(),
            InternalTransfer: joi.boolean().required()
        });
    }

    public AcountInfoSchema() {
        return joi.object({
            AccountID: joi.number().required()
        });
    }

    public AcountTransactionInfoSchema() {
        return joi.object({
            AccountID: joi.number().required()
        });
    }
}