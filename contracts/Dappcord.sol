// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Dappcord is ERC721URIStorage {
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {
    
  }
}
