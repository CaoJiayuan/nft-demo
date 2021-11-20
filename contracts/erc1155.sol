pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NerioDemoGameItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;

    constructor() public ERC1155("https://raw.githubusercontent.com/CaoJiayuan/nft-demo/master/data/tokens/{id}.json") {
        _mint(msg.sender, GOLD, 10**10, "");
        _mint(msg.sender, SILVER, 10**27, "");
    }
}