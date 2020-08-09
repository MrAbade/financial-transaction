import { Router } from 'express';

import TransactionsController from '../controllers/Transactions.controllers';

const transactionRouter = Router();

transactionRouter.get('/', TransactionsController.list);

transactionRouter.post('/', TransactionsController.create);

export default transactionRouter;
