import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: string;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const valueConvertedNumber = Number(value);
    const { total } = this.transactionsRepository.getBalance();

    if (Number.isNaN(valueConvertedNumber)) {
      throw Error(
        'Value field is invalid number, please inform a valid number (Example: 100.50).',
      );
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error(
        'Type field is invalid, please inform the type "income" or "outcome".',
      );
    }

    if (type === 'outcome' && valueConvertedNumber > total) {
      throw Error('Balance insuficient. You don`t have enough balance.');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value: valueConvertedNumber,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
