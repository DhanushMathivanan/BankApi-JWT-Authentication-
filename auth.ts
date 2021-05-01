import * as express from "express";
const jwt = require('jsonwebtoken');

export class auth {
  public static authenticate(app: express.Express) {
    app.use(function (req, res, next) {
      try {
        if (req.url === '/customers/create') {
          next();
        } else {
          console.log(req.url);
          const token = req.headers['token'];
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
          const customerId = decodedToken.customerId;
          if (req.headers['customerid']) {
            if (req.headers['customerid'] && Number(req.headers['customerid']) !== Number(customerId)) {
              throw 'Invalid user ID';
            } else {
              next();
            }
          } else {
            throw 'Invalid user ID';
          }
        }
      } catch {
        res.status(401).json({
          error: new Error('Invalid request!')
        });
      }
    });
  }
}

