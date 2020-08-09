import TransactionsRepository from '../repositories/Transactions.repositories';
import Transaction from '../models/Transactions.classes';
import WebError from '../customs/WebError.classes';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export default class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: CreateTransactionDTO): Transaction {
    if (type === 'outcome') {
      this.hasEnoughBalance(value);
    }

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }

  private hasEnoughBalance(value: number): boolean {
    const { total } = this.transactionsRepository.getBalance();

    if (total < value) {
      throw new WebError({ message: "You don't have enough balance", status: 400 });
    }

    return true;
  }
}
