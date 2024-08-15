const hre = require('hardhat');
const { ethers } = hre;
const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(), 'ether');
};

async function main() {
  const [deployer] = await ethers.getSigners();
  const NAME = 'Dappcord';
  const SYMBOL = 'DC';
  const Dappcord = await ethers.getContractFactory('Dappcord');
  const dappcord = await Dappcord.connect(deployer).deploy(NAME, SYMBOL);
  await dappcord.deployed();
  console.log('Dappcord deployed to:', dappcord.address);

  // Create 3 channels
  const CHANNEL_NAMES = ['general', 'intro', 'jobs'];
  const COSTS = [tokens(1), tokens(0), tokens(0.25)];
  for (let i = 0; i < 3; i++) {
    const transaction = await dappcord
      .connect(deployer)
      .createChannel(CHANNEL_NAMES[i], COSTS[i]);
    await transaction.wait();
    console.log(`Created channel ${CHANNEL_NAMES[i]} with cost ${COSTS[i]}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
