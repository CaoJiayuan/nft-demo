pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract NerioDemoGameItems is ERC1155 {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant GEM = 2;

    constructor() public ERC1155("https://raw.githubusercontent.com/CaoJiayuan/nft-demo/master/data/tokens/{id}.json") {
        _mint(msg.sender, GOLD, 128, "");
        _mint(msg.sender, SILVER, 1024, "");
        _mint(msg.sender, GEM, 1, "");
    }

    function transfer(address from, address to, uint256 id, uint256 amount, bytes memory data) public {
        safeTransferFrom(from, to, id, amount, data);
    }
}