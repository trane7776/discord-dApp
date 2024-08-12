const { expect } = require('chai');
const { ethers } = require('hardhat');
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

describe('Dappcord', function () {
  let dappcord;
  let deployer, user;
  const NAME = 'Dappcord';
  const SYMBOL = 'DC';

  beforeEach(async () => {
    [deployer, user] = await ethers.getSigners();
    // Deploy Contract
    const Dappcord = await ethers.getContractFactory('Dappcord');
    dappcord = await Dappcord.connect(deployer).deploy(NAME, SYMBOL);

    // Create a channel
    const transaction = await dappcord
      .connect(deployer)
      .createChannel('general', tokens(1));
    await transaction.wait();
  });

  describe('Deployment', () => {
    it('Sets the name', async () => {
      // Fetch name
      let result = await dappcord.name();
      // Check name
      expect(result).to.equal(NAME);
    });

    it('Sets the symbol', async () => {
      // Fetch symbol
      let result = await dappcord.symbol();
      // Check symbol
      expect(result).to.equal(SYMBOL);
    });

    it('Sets the owner', async () => {
      const result = await dappcord.owner();
      expect(result).to.equal(deployer.address);
    });
  });
  describe('Creating Channels', () => {});
});
