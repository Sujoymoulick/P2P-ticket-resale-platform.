const contractAddress = '0xe3977e3c25053933d891FC4f886439FFD2bf8d2A'; 
const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_ticketId",
          "type": "uint256"
        }
      ],
      "name": "buyTicket",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_eventName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_price",
          "type": "uint256"
        }
      ],
      "name": "listTicket",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "owner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "eventName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "TicketListed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "ticketId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "TicketPurchased",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "ticketCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "tickets",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "id",
          "type": "uint256"
        },
        {
          "internalType": "address payable",
          "name": "owner",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "eventName",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isAvailable",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];

let web3 = new Web3(Web3.givenProvider);

let contract = new web3.eth.Contract(abi, contractAddress);

async function updateTicketInfo() {
    let eventName = await contract.methods.eventName().call();
    let ticketPrice = await contract.methods.ticketPrice().call();
    let ticketCount = await contract.methods.ticketCount().call();

    document.getElementById('eventName').textContent = eventName;
    document.getElementById('ticketPrice').textContent = ticketPrice;
    document.getElementById('ticketCount').textContent = ticketCount;
}

updateTicketInfo();

async function buyTickets() {
    let amount = document.getElementById('buyAmount').value;
    try {
        await contract.methods.buyTickets(amount).send({ from: web3.eth.defaultAccount, value: amount * ticketPrice });
        document.getElementById('txStatus').textContent = `Successfully bought ${amount} ticket(s)!`;
        updateTicketInfo();
    } catch (error) {
        console.error(error);
        document.getElementById('txStatus').textContent = 'Transaction failed. Please try again.';
    }
}

async function sellTickets() {
    let amount = document.getElementById('sellAmount').value;
    let price = document.getElementById('sellPrice').value;
    try {
        await contract.methods.sellTickets(amount, price).send({ from: web3.eth.defaultAccount });
        document.getElementById('txStatus').textContent = `Successfully listed ${amount} ticket(s) for sale!`;
        updateTicketInfo();
    } catch (error) {
        console.error(error);
        document.getElementById('txStatus').textContent = 'Transaction failed. Please try again.';
    }
}
