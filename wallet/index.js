const { INITIAL_BALANCE } = require('../config');
const Transaction = require('./transaction');
const ChainUtil = require('../chain-util');
class Wallet {
    constructor(){
        this.balance = INITIAL_BALANCE;
        this.keyPair = ChainUtil.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    toString(){
        return `Wallet:
            Public Key: ${this.publicKey.toString()}
            Balance   : ${this.balance}`;
    }

    sign(dataHash){
        return this.keyPair.sign(dataHash);
    }

    createTransaction(recipient, amount, transactionPool){
        if( amount > this.balance){
            console.log(`Anount: ${amount} exceeds the balance ${this.balance}`);
            return; 
        }
        let transaction = transactionPool.existingTransaction(this.publicKey);
        if(transaction){
            transaction.update(this, recipient, amount);
        }else{
            transaction = Transaction.newTransaction(this,recipient,amount);
            transactionPool.updateOrAddTransaction(transaction);
        }
        return transaction;
    }

}

module.exports = Wallet;