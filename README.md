# blockchain-lib
a basic blockchain implementation with wallets in node.js

<h2>How to install</h2>

1. Clone or download the zip of this repository on to your local machine.
2. Unzip the archive to a folder (Only do this if you download the zip, otherwise skip this step).
3. Go to the folder of your node.js application.
4. Type the command 'npm install <put the path of unzipped or cloned repository here>' without the quotes.
5. Done! Now you can use the library!

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
      //create and check the signature of the transaction!
      if(example_coin.createTransaction(new Transaction(example_wallet_1.addressList[0], example_wallet_2.addressList[0], 100))) {
        
        //update the balance of each wallet!
        example_wallet_1.updateBalance();
        example_wallet_2.updateBalance();
        
        //output the block pushed to the blockchain in the console!
        console.log("----------------\n\nLatest Block Pushed:\n\n" + JSON.stringify(example_coin.getLatestBlock()) + '\n\n----------------');

      }

    }
