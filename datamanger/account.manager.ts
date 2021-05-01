import { SqlManger } from '../helpers/sql.manager';
import { SelectQuery, InsertQuery, UpdateQuery } from '../queries';
import { ResponseMessages, BankAccountConfigMessages } from '../constants/messageconstant';

export class AccountManager {

    public async transferAmount(transferInfo: any) {
        const sqlManager = new SqlManger();
        const transaction = await sqlManager.InitiateTransaction();
        try {
            const customers = await sqlManager.ExecuteQueryWithTransaction(SelectQuery.getAccountsByIds, transferInfo, transaction);
            const debitAccountArray = customers.filter(ele => ele.CustomerInfoID === transferInfo.DebitAccountID);
            const creditAccountArray = customers.filter(ele => ele.CustomerInfoID === transferInfo.CreditAccountID);
            if (parseInt(debitAccountArray[0].Amount, 0) < (transferInfo.CreditAmount + BankAccountConfigMessages.MIN_ACT_BAL)) {
                await transaction.commit();
                return ResponseMessages.CUS_INVALID_BAL;
            } else {
                const fromAmount = parseInt(debitAccountArray[0].Amount, 0) - transferInfo.CreditAmount;
                const toAmount = parseInt(creditAccountArray[0].Amount, 0) + transferInfo.CreditAmount;
                await sqlManager.UpdateTransaction(UpdateQuery.updateDebitAccount,
                    {
                        DebitAmount: fromAmount,
                        DebitAccountID: debitAccountArray[0].CustomerInfoID,
                    }, transaction);
                await sqlManager.InsertTransaction(InsertQuery.logTransactionDetails, {
                    TransactionID: debitAccountArray[0].CustomerInfoID,
                    DebitAccountID: debitAccountArray[0].CustomerInfoID,
                    CreditAccountID: creditAccountArray[0].CustomerInfoID,
                    CreditAmount: null,
                    DebitAmount: transferInfo.CreditAmount
                }, transaction);
                if (transferInfo.InternalTransfer === true) {
                    await sqlManager.UpdateTransaction(UpdateQuery.updateCreditAccount,
                        {
                            CreditAmount: toAmount,
                            CreditAccountID: creditAccountArray[0].CustomerInfoID
                        }, transaction);
                    await sqlManager.InsertTransaction(InsertQuery.logTransactionDetails, {
                        TransactionID: creditAccountArray[0].CustomerInfoID,
                        DebitAccountID: debitAccountArray[0].CustomerInfoID,
                        CreditAccountID: creditAccountArray[0].CustomerInfoID,
                        CreditAmount: transferInfo.CreditAmount,
                        DebitAmount: null
                    }, transaction);
                }

                await transaction.commit();
                return ResponseMessages.CUS_TRAN_SUCC;
            }
        } catch (error) {
            await transaction.rollback();
            throw error;
        }

    }
    public async getAccountBalance(AccountId: number) {
        try {
            const balance = await new SqlManger().Get(SelectQuery.getAccountBalance, { AccountID: AccountId });
            return { AccountBalance: balance[0].Amount, AccountID: balance[0].CustomerInfoID };
        } catch (error) {
            throw (error);
        }

    }
    public async getTransactionHistory(AccountId: number) {
        try {
            const transactionHistory = await new SqlManger().Get(SelectQuery.getTransactionHistoryByAccount, { AccountID: AccountId });
            return transactionHistory;
        } catch (error) {
            throw (error);
        }

    }

}