const Transation = require('./transaction');
const Wallet = require('.');

describe('Transaction', () => {
    let wallet, transaction, recipient, amount;
    beforeEach(() => {
        wallet = new Wallet();
        recipient = 'te23k45k63k2';
        amount = 50;
        transaction = Transation.newTransaction(wallet, recipient, amount);
    });

    it('outputs the `amount` subtracted from the wallet balance', ()=> {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
        .toEqual(wallet.balance - amount);
    });

    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find( output => output.address === recipient).amount)
        .toEqual(amount);
    });

    it('inputs the `amount` in the transaction', () =>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a the transaction',() => {
        expect(Transation.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corupted transaction', () => {
        transaction.outputs[0].amount = 50000;
        expect(Transation.verifyTransaction(transaction)).toBe(false);
    });

    describe('amount greater than user balance', () => {
        beforeEach(() => {
            amount = 50000;
            transaction = Transation.newTransaction(wallet, recipient, amount);
        });
        
        it('does not create the transaction object', () => {
            expect(transaction).toEqual(undefined);
        });
    });

    describe('updating the transaction', () => {
        let nextAmount, nextRecipient;

        beforeEach(() => {
            nextAmount = 20;
            nextRecipient = 'n3xt-6ec6i9ent';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it(`subtract the nextamount from the sender's amount`, () => {
            expect(transaction.outputs.find( output => output.address === wallet.publicKey).amount)
            .toEqual( wallet.balance - amount - nextAmount);
        });

        it('outputs new amount as nextAmount', () => {
            expect(transaction.outputs.find(output => output.address === nextRecipient).amount)
            .toEqual(nextAmount);
        });

    });

});