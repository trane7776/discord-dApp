import { ethers } from 'ethers';

const Navigation = ({ account, setAccount }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);
  };

  return (
    <nav>
      <div className="nav-brand">
        <h1>Dappcord</h1>
      </div>
      {account ? (
        <button type="button" className="nav-connect">
          {account.slice(0, 6)}...{account.slice(-4)}
        </button>
      ) : (
        <button type="button" className="nav-connect" onClick={connectHandler}>
          Connect
        </button>
      )}
    </nav>
  );
};

export default Navigation;
