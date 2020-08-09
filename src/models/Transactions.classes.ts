import { uuid } from 'uuidv4';

interface TransactionDTO {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

export default class Transaction implements TransactionDTO {
  id: string;

  title: string;

  value: number;

  type: 'income' | 'outcome';

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}
