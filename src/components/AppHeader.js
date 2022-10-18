import React, { useState, useEffect } from "react";

const { ethers } = require("ethers");

// const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
const provider = new ethers.providers.Web3Provider(window.ethereum);

function AppHeader() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [isLoadSuccess, setLoadSuccess] = useState(false);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log("MetaMask Here!");

      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChangedHandler(result[0]);
          setConnButtonText("Wallet Connected");
          getAccountBalance(result[0]);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    } else {
      console.log("Need to install MetaMask");
      setErrorMessage("Please install MetaMask browser extension to interact");
    }
  };

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
    setLoadSuccess(true);
  };

  const getAccountBalance = (account) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [account, "latest"] })
      .then((balance) => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const chainChangedHandler = () => {
    // reload the page to avoid any errors with chain change mid use of application
    window.location.reload();
  };

  // listen for account changes
  window.ethereum.on("accountsChanged", accountChangedHandler);

  window.ethereum.on("chainChanged", chainChangedHandler);

  return (
    <header className="bg-green-600 flex justify-between p-2.5 items-center">
      <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
      <div className="flex gap-3 items-center">
        {isLoadSuccess && (
          <div>
            <div className="accountDisplay text-black">
              <h3>Address: {defaultAccount}</h3>
            </div>
            <div className="balanceDisplay">
              <h3>Balance: {userBalance}</h3>
            </div>
          </div>
        )}
        <button
          className="p-2 bg-blue-500 rounded-md "
          onClick={connectWalletHandler}
        >
          {connButtonText}
        </button>
      </div>
    </header>
  );
}

export default AppHeader;
