export const SelectQuery = {
    getCustomers: "Select * from customer",
    getAccountsByIds: `select account.CustomerInfoID, account.Amount, account.CustomerInfoID, customer.CustomerName from account 
    join customer on customer.CustomerID =  account.CustomerInfoID
    where CustomerInfoID in (:DebitAccountID, :CreditAccountID)`,
    getAccountBalance: `select Amount, CustomerInfoID from account where CustomerInfoID= :AccountID`,
    getTransactionHistoryByAccount: `select TransactionID,DebitAccountID,CreditAccountID,CreditAmount,DebitAmount,CreatedOn as Date from transactionHistory where TransactionID = :AccountID`,
}