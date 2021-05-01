# Bank API WITH JWT AUTHENTICATION 
================================
# SQLITE DB and Table Scripts
================================

CREATE DATABASE `BankDB`;

CREATE TABLE "customer" (
	"CustomerName"	TEXT,
	"CustomerInitial"	TEXT,
	"WithInBank"	TEXT,
	"Amount"	INTEGER,
	"CreatedOn"	TEXT,
	"CustomerID"	INTEGER,
	"Password"	BLOB NOT NULL,
	PRIMARY KEY("CustomerID")
)

CREATE TABLE "account" (
	"CustomerInfoID"	INTEGER UNIQUE,
	"Amount"	INTEGER,
	"WithInBank"	TEXT,
	"CreatedOn"	TEXT NOT NULL,
	FOREIGN KEY("CustomerInfoID") REFERENCES "customer"("CustomerID") ON UPDATE SET NULL
)

CREATE TABLE "transactionHistory" (
	"TransactionID"	INTEGER,
	"DebitAccountID"	INTEGER,
	"CreditAccountID"	INTEGER,
	"CreditAmount"	INTEGER,
	"DebitAmount"	INTEGER,
	"CreatedOn"	TEXT,
	"LogID"	INTEGER,
	PRIMARY KEY("LogID" AUTOINCREMENT)
)

---------------------------------------------------------------------
# REST API'S TO CREATE CUSTOMER ACCOUNT AND TOKEN FOR AUTHENTICATION
---------------------------------------------------------------------
# METHOD: POST
http://localhost:4200/customers/create

{
    "Amount":5000,
    "CustomerName": "Georgina Hazel",
    "CustomerInitial": "H",
    "Password": "testCheck",
    "WithInBank": true
}

# SAMPLE OUTPUT

{
    "customerInfo": {
        "customerId": 7345282216,
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjo3MzQ1MjgyMjE2LCJpYXQiOjE2MTk4NjQ5OTYsImV4cCI6MTYxOTk1MTM5Nn0.29JaLuoSiDM_0m61h-GoSjJGykutR5gRC8a-HHm0u-o"
    },
    "message": "Customer Created Successfully"
}

===================================================================================================================================================

------------------------------
# API TO GET LIST OF CUSTOMERS
-------------------------------

# METHOD: GET
http://localhost:4200/customers

# INPUT HEADERS 
{
    "customerId": 1222565359,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMjIyNTY1MzU5LCJpYXQiOjE2MTk4NjQ4OTQsImV4cCI6MTYxOTk1MTI5NH0.mBStFARW-Yr0TeA0-4PugsRZhqIlD-pkU4Xm0uAGD08"
    
}

# SAMPLE OUTPUT

{
    "customerInfo": [
        {
            "CustomerName": "Arisha Barron",
            "CustomerInitial": "A",
            "WithInBank": "1",
            "CreatedOn": "2021-05-01T04:58:14.000Z",
            "CustomerID": 1222565359
        },
        {
            "CustomerName": "Rhonda Church",
            "CustomerInitial": "R",
            "WithInBank": "1",
            "CreatedOn": "2021-05-01T04:59:31.000Z",
            "CustomerID": 2005681927
        },
        {
            "CustomerName": "Georgina Hazel",
            "CustomerInitial": "H",
            "WithInBank": "1",
            "CreatedOn": "2021-05-01T04:59:56.000Z",
            "CustomerID": 7345282216
        },
        {
            "CustomerName": "Branden Gibson",
            "CustomerInitial": "G",
            "WithInBank": "1",
            "CreatedOn": "2021-05-01T04:59:06.000Z",
            "CustomerID": 8684836959
        }
    ]
}
===================================================================================================================================================

-------------------------------------------------------
# API TO TRANSFER MONEY BETWEEN ACCOUNTS
-------------------------------------------------------

# METHOD: POST

http://localhost:4200/account/transfer

# FOR NON INTERNAL BANK ACCOUNT TRANSFER "InternalTransfer" SHOULD BE FALSE

# SAMPLE INPUT

{
    "TransactionID": 1222565359,
    "DebitAccountID": 1222565359,
    "CreditAccountID": 2005681927,
    "CreditAmount": 1000,
    "InternalTransfer": true
}

# INPUT HEADERS 
{
    "customerId": 1222565359,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMjIyNTY1MzU5LCJpYXQiOjE2MTk4NjQ4OTQsImV4cCI6MTYxOTk1MTI5NH0.mBStFARW-Yr0TeA0-4PugsRZhqIlD-pkU4Xm0uAGD08"
}

# SAMPLE OUTPUT

{
    "transactionInfo": "Account Transaction Successful"
}

===================================================================================================================================================

------------------------------------------------
# API TO GET ACCOUNT BALANCE BASED ON ACCOUNT ID
------------------------------------------------

# METHOD: GET

http://localhost:4200/account/balance

# SAMPLE INPUT

{
    "AccountID": 1222565359

}

# INPUT HEADERS 
{
    "customerId": 1222565359,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMjIyNTY1MzU5LCJpYXQiOjE2MTk4NjQ4OTQsImV4cCI6MTYxOTk1MTI5NH0.mBStFARW-Yr0TeA0-4PugsRZhqIlD-pkU4Xm0uAGD08"
}

# SAMPLE OUTPUT

{
    "accountInfo": {
        "AccountBalance": 3000,
        "AccountID": 1222565359
    }
}

===================================================================================================================================================


----------------------------------------------------------
# API TO GET TRANSACTION LOG HISTORY BASED ON ACCOUNTIS
----------------------------------------------------------

# METHOD: GET

http://localhost:4200/account/transactionHistory

# SAMPLE INPUT

{
    "AccountID": 1222565359

}

# INPUT HEADERS 
{
    "customerId": 1222565359,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcklkIjoxMjIyNTY1MzU5LCJpYXQiOjE2MTk4NjQ4OTQsImV4cCI6MTYxOTk1MTI5NH0.mBStFARW-Yr0TeA0-4PugsRZhqIlD-pkU4Xm0uAGD08"
}

# SAMPLE OUTPUT

{
    "transactionLogInfo": [
        {
            "TransactionID": 1222565359,
            "DebitAccountID": 1222565359,
            "CreditAccountID": 8684836959,
            "CreditAmount": null,
            "DebitAmount": 1000,
            "Date": "2021-05-01 10:32:21"
        },
        {
            "TransactionID": 1222565359,
            "DebitAccountID": 1222565359,
            "CreditAccountID": 2005681927,
            "CreditAmount": null,
            "DebitAmount": 1000,
            "Date": "2021-05-01 10:32:36"
        }
    ]
}
  
===================================================================================================================================================








