import Transaction from '../models/Transactions.classes';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export default class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): BalanceDTO {
    const balance: BalanceDTO = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    if (this.hasIncome()) {
      balance.income = this.transactions
        .filter(transaction => transaction.type === 'income')
        .map(transaction => transaction.value)
        .reduce((accumulatedValue, value) => accumulatedValue + value);
    }

    if (this.hasOutcome()) {
      balance.outcome = this.transactions
        .filter(transaction => transaction.type === 'outcome')
        .map(transaction => transaction.value)
        .reduce((accumulatedValue, value) => accumulatedValue + value);
    }

    balance.total = balance.income - balance.outcome;

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }

  private hasIncome(): boolean {
    const foundIncome = this.transactions.find(transaction => transaction.type === 'income');

    if (!foundIncome) {
      return false;
    }

    return true;
  }

  private hasOutcome(): boolean {
    const foundOutcome = this.transactions.find(transaction => transaction.type === 'outcome');

    if (!foundOutcome) {
      return false;
    }

    return true;
  }
}
