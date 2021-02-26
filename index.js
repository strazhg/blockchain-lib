var sha256 = require('crypto-js/sha256');
var sha512 = require('crypto-js/sha512');

class Block {

	constructor(index, data, previousHash) {

		this.index = index;
		this.timestamp = new Date().toLocaleDateString().toString();
		this.data = data;
		this.previousHash = previousHash;
		this.nonce = 0;
		this.hash = this.computeHash();

	}

	computeHash() {

		return sha512(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString();

	}

	proofOfWork(difficulty) {

		while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {

			this.nonce++;
			this.hash = this.computeHash();

		}

	}

}

class Blockchain {

	constructor() {

		this.chain = [new Block(0, "Genesis Block", "0")];

	}

	getLatestBlock() {

		return this.chain[this.chain.length - 1];

	}

	addNewBlock(newBlock) {

		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.proofOfWork(3);
		this.chain.push(newBlock);

	}

	isChainValid() {
		for(var i = 1; i < this.chain.length; i++) {

			var currentBlock = this.chain[i];
			var previousBlock = this.chain[i - 1];

			if(currentBlock.hash !== currentBlock.computeHash()) {

				return false;

			}
			if(currentBlock.previousHash !== previousBlock.hash) {

				return false;

			}

		}

		return true;

	}

	createTransaction(transaction) {
		var signature = transaction.sign();

		if(transaction.verify(signature)) {

			this.addNewBlock(new Block(this.getLatestBlock().index + 1, transaction, this.getLatestBlock().hash));
			return true;

		} else {

			return false;

		}

	}

	getBalanceOfAddress(address) {

		var balance = 0;

		if(address === this.getLatestBlock().data.fromAddress) {

			balance -= this.getLatestBlock().data.amount;

		}

		if(address === this.getLatestBlock().data.toAddress) {

			balance += this.getLatestBlock().data.amount;
		}

		return balance;

	}

}

class Transaction {

	constructor(fromAddress, toAddress, amount) {

		this.fromAddress = fromAddress;
		this.toAddress = toAddress;
		this.amount = amount;

	}

	sign() {

		return sha512(this.fromAddress + this.toAddress + this.amount).toString();

	}

	verify(signature) {

		if(signature === this.sign()) {

			return true;

		} else {

			return false;

		}

	}

}

class Wallet {

	constructor(blockchain, numberOfAddresses) {

		this.numberOfAddresses = numberOfAddresses;
		this.totalBalance = 0;
		this.addressList = [];

		this.blockchain = blockchain;

		for(var i = 0; i < this.numberOfAddresses; i++) {

			this.addressList[i] = sha256(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

		}


	}

	updateBalance() {

		for(var i = 0; i < this.addressList.length; i++) {

			this.totalBalance += this.blockchain.getBalanceOfAddress(this.addressList[i]);

		}

	}

}

module.exports.Block = Block;
module.exports.Blockchain = Blockchain;
module.exports.Transaction = Transaction;
module.exports.Wallet = Wallet;
