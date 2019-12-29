const Transaction = require('./transaction');
const TransactionPool = require('./transaction-pool');
const Wallet = require('./index');

describe('Transaction-Pool', () => {
    let tp,wallet,transaction;

    beforeEach(() => {
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet,'n24-r6c68pent',30);
        tp.updateOrAddTransaction(transaction);
    });

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(tp => tp.id === transaction.id))
            .toEqual(transaction);
    });
    it('updates the existing transaction', () => {
        const oldTransaction = JSON.stringify(transaction);
        const nextTransaction = transaction.update(wallet,'f00-rec3p83nt',20);
        tp.updateOrAddTransaction(nextTransaction);
        expect(JSON.stringify(tp.transactions.find(t => t.id === nextTransaction.id)))
            .not.toEqual(oldTransaction);
    });
});