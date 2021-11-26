pragma solidity ^0.8.0;

import "../node_modules/@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";
contract NerioErc1155v2 is ERC1155, Ownable {
    uint256[] private ids;

    constructor() public ERC1155("https://raw.githubusercontent.com/CaoJiayuan/nft-demo/master/data/tokens/{id}.json") {

    }

   
    function mint(address account, uint256 id, uint256 amount, bytes memory data)  
        public onlyOwner
    {
        if (!hasToken(id)) {
            ids.push(id);
        }
        _mint(account, id, amount, data);
    }

    function hasToken(uint256 id) 
        public onlyOwner view returns(bool)
    {
        for (uint256 index = 0; index < ids.length; index++) {
            if (id == ids[index]) {
                return true;
            }
        }
        return false;
    }


    function balanceOfAccount(address account) 
      public onlyOwner view returns (uint256[] memory, uint256[] memory)
    {
        uint256[] memory tokens = new uint256[](ids.length);
        uint256[] memory balances = new uint256[](ids.length);

        for (uint256 index = 0; index < ids.length; index++) {
            uint256 id = ids[index];
            tokens[index] = id;
            balances[index] = balanceOf(account, id);
        }

        return (tokens, balances);
    }
}