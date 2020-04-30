import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0,
    };

    const transactionGroupByType = this.transactions.reduce((acc, obj) => {
      const { type } = obj;

      acc[type] += obj.value;

      if (type === 'income') {
        acc.total += obj.value;
      } else if (type === 'outcome') {
        acc.total -= obj.value;
      }

      return acc;
    }, balance);

    return transactionGroupByType;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({
      title,
      value,
      type,
    });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
