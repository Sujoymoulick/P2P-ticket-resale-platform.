// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract P2PTicketResale {
    struct Ticket {
        uint id;
        address payable owner;
        string eventName;
        uint price;
        bool isAvailable;
    }

    mapping(uint => Ticket) public tickets;
    uint public ticketCount;
    
    event TicketListed(uint ticketId, address owner, string eventName, uint price);
    event TicketPurchased(uint ticketId, address newOwner, uint price);
    
    modifier onlyOwner(uint _ticketId) {
        require(msg.sender == tickets[_ticketId].owner, "Not the ticket owner");
        _;
    }
    
    function listTicket(string memory _eventName, uint _price) public {
        ticketCount++;
        tickets[ticketCount] = Ticket(ticketCount, payable(msg.sender), _eventName, _price, true);
        emit TicketListed(ticketCount, msg.sender, _eventName, _price);
    }
    
    function buyTicket(uint _ticketId) public payable {
        Ticket storage ticket = tickets[_ticketId];
        require(ticket.isAvailable, "Ticket not available");
        require(msg.value >= ticket.price, "Insufficient payment");
        
        ticket.owner.transfer(msg.value);
        ticket.owner = payable(msg.sender);
        ticket.isAvailable = false;
        
        emit TicketPurchased(_ticketId, msg.sender, ticket.price);
    }
}
