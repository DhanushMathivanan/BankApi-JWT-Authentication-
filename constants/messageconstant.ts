enum ResponseMessages {
    CUS_ADD = 'Customer Created Successfully',
    CUS_MIN_AMT_ADD = 'Minimum Amount should be more than 100',
    CUS_TRAN_SUCC = 'Account Transaction Successful',
    CUS_INVALID_BAL = 'Insufficient balance in Account'
}

enum BankAccountConfigMessages {
    MIN_ACT_BAL = 100
}

export {ResponseMessages, BankAccountConfigMessages};