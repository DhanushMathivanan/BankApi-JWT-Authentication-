export const InsertQuery = {
    createCustomer: `Insert into customer (CustomerName,CustomerInitial,WithInBank,CreatedOn,Password,CustomerID) values
    (:CustomerName,:CustomerInitial,:WithInBank,CURRENT_TIMESTAMP,:Password,:CustomerID)`,
    createAccount: `Insert into account (Amount,WithInBank,CreatedOn,CustomerInfoID) values
    (:Amount,:WithInBank,CURRENT_TIMESTAMP,:CustomerID)`,
    logTransactionDetails: `Insert into transactionHistory (TransactionID,DebitAccountID,CreditAccountID,CreditAmount,DebitAmount,CreatedOn) values 
    (:TransactionID,:DebitAccountID,:CreditAccountID,:CreditAmount,:DebitAmount,CURRENT_TIMESTAMP)`,

} 