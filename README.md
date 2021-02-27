# blockchain-lib
a basic blockchain implementation with wallets

<h2>Usage Example</h2>

    //adding blockchain-lib library!
    const blockchain_lib = require('blockchain-lib');

    //accuiring required classes!
    const Blockchain = blockchain_lib.Blockchain;
    const Transaction = blockchain_lib.Transaction;
    const Wallet = blockchain_lib.Wallet;

    //initializing the blockchain(s) and wallet(s)!
    var example_coin = new Blockchain();
    var example_wallet_1 = new Wallet(example_coin, 1);
    var example_wallet_2 = new Wallet(example_coin, 1);

    //don't use this to change the total balance! Only use transactions unless you are testing this code!
    example_wallet_1.totalBalance = 1000;

    while(true) {

      if(example_coin.createTransaction(new Transaction(example_wallet_1.addressList[0], example_wallet_2.addressList[0], 100))) {

        example_wallet_1.updateBalance();
        example_wallet_2.updateBalance();

        console.log("----------------\n\nLatest Block Pushed:\n\n" + JSON.stringify(example_coin.getLatestBlock()) + '\n\n----------------');

      }

    }
