// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Dappcord is ERC721URIStorage {
  uint256 public totalChannels = 0;
  address public owner;
  struct Channel {
    uint256 id;
    string name;
    uint256 cost;
  }

  mapping(uint256 => Channel) public channels;
  constructor(string memory _name, string memory _symbol)
    ERC721(_name, _symbol)
  {
    owner = msg.sender;
  }

  function createChannel(string memory _name, uint256 _cost) public {
    totalChannels++;
    channels[totalChannels] = Channel(totalChannels, _name, _cost);
  }
}
