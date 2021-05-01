export const UpdateQuery = {
    updateDebitAccount: `update account set amount=:DebitAmount where CustomerInfoID =:DebitAccountID`,
    updateCreditAccount:`update account set amount=:CreditAmount where CustomerInfoID =:CreditAccountID;`
};