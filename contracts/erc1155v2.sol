pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract NerioErc1155v2 is ERC1155, Ownable {

    constructor() public ERC1155("https://raw.githubusercontent.com/CaoJiayuan/nft-demo/master/data/tokens/{id}.json") {

    }

   
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    )  public onlyOwer {
        _mint(account, id, amount, data);
    }
}