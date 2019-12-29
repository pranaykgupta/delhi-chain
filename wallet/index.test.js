const Wallet = require('./index');
const TransactionPool = require('./transaction-pool');
const Transaction = require('./transaction');

describe('Transaction Pool', () => {
    let wallet, tp;
    beforeEach( () => {
        wallet = new Wallet();
        tp = new TransactionPool();
    });

    describe('creating a transaction', () => {
        let recipient, sendAmount,transaction;
        beforeEach( () => {
            recipient = 'fo3-33l4l32j';
            sendAmount = 50;
            transaction = wallet.createTransaction(recipient, sendAmount, tp);
        });

        describe('and doing the same transaction', () => {
            beforeEach(() => {
                wallet.createTransaction(recipient, sendAmount, tp);
            });

            it('doubles of `sendAmount` subtracted from the wallet balance', () => {
                expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
                    .toEqual(wallet.balance - 2* sendAmount);
            });

            it('clones the `sendAmont` output for the recipient', () => {
                expect(transaction.outputs.filter( output => output.address === recipient)
                .map(output => output.amount)).toEqual([sendAmount, sendAmount]);
            });

        });

    });
});