import { Request, Response, NextFunction } from 'express';

import TransactionsRepository from '../repositories/Transactions.repositories';
import CreateTransactionService from '../services/CreateTransactionService';
import WebError from '../customs/WebError.classes';

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(transactionsRepository);

interface TransactionControllerDTO {
  list(_request: Request, response: Response, next: NextFunction): Response | void;
  create(request: Request, response: Response, next: NextFunction): Response | void;
}

const TransactionController: TransactionControllerDTO = {
  list: (_request: Request, response: Response, next: NextFunction): Response | void => {
    try {
      const transactions = transactionsRepository.all();

      const balance = transactionsRepository.getBalance();

      const responseBody = { balance, transactions };
      const httpStatusCodeOk = 200;

      response.locals.responseBody = responseBody;
      response.locals.httpStatusCode = httpStatusCodeOk;

      return next();
    } catch (error) {
      if (!error.status) {
        error.status = 500;
      }

      response.locals.error = error;
      return next();
    }
  },

  create: (request: Request, response: Response, next: NextFunction): Response | void => {
    const { title, type, value } = request.body;

    try {
      if (!title) {
        throw new WebError({ message: 'Transaction title is missing', status: 400 });
      }

      if (!type) {
        throw new WebError({ message: 'Transaction type is missing', status: 400 });
      }

      if (!value) {
        throw new WebError({ message: 'Transaction value is missing', status: 400 });
      }

      const transactionCreated = createTransactionService.execute({
        title,
        type,
        value,
      });

      const httpStatusCodeCreated = 201;

      response.locals.responseBody = transactionCreated;
      response.locals.httpStatusCode = httpStatusCodeCreated;

      return next();
    } catch (error) {
      if (!error.status) {
        error.status = 500;
      }

      response.locals.error = error;
      return next();
    }
  },
};

export default TransactionController;
