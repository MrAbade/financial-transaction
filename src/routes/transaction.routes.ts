import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import WebError from '../customs/WebError.class';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);

transactionRouter.get('/', (_request, response) => {
  try {
    const transactions = transactionsRepository.all();

    const balance = transactionsRepository.getBalance();

    return response.status(200).json({ balance, transactions });
  } catch (err) {
    return response.status(err.status || 400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, type, value } = request.body;

  try {
    if (!title) {
      throw new WebError({
        message: 'Transaction title is missing',
        status: 400,
      });
    }

    if (!type) {
      throw new WebError({
        message: 'Transaction type is missing',
        status: 400,
      });
    }

    if (!value) {
      throw new WebError({
        message: 'Transaction value is missing',
        status: 400,
      });
    }

    const transactionCreated = createTransactionService.execute({
      title,
      type,
      value,
    });

    return response.status(201).json(transactionCreated);
  } catch (err) {
    return response.status(err.status || 400).json({ error: err.message });
  }
});

export default transactionRouter;
