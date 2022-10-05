import logo from "./logo.svg";
import "./App.css";
import simple_token_abi from "./abi/contractNFT.json";
import React, { useState, useEffect } from "react";
import Web3 from "web3";
const { ethers } = require("ethers");
const BN = require("bn.js");
// const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState("Connect Wallet");

  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);

  const [nftName, setnftName] = useState("FUCK");
  const [supply, setSupply] = useState(null);
  const [transferHash, setTransferHash] = useState(null);

  let contractAddress = "0xad5A1F2B9b0B9A76BbD708036B3833558f3136B3";
  const contracttest = new ethers.Contract(
    contractAddress,
    simple_token_abi,
    provider
  );

  const lol = async () => {
    console.log(1);
    let tempProvider = new ethers.providers.Web3Provider(window.ethereum);
    console.log(2);
    let tempSigner = tempProvider.getSigner();
    console.log(3);
    let tempContract = new ethers.Contract(
      contractAddress,
      simple_token_abi,
      tempSigner
    );
    console.log(4);
    let a = await tempContract.name();
    let b = await tempContract.symbol();
    let c = await tempContract.totalSupply();
    let d = await tempContract.owner();
    let z = await tempContract.tokenURI(0);
    //c = ethers.utils.formatEther(c);
    console.log(defaultAccount);
    let y = await tempContract.balanceOf(defaultAccount);

    console.log(a, b, c, c.toNumber(), c.toHexString(), d, z, y.toNumber());
  };
  lol();

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
    <div className="walletCard">
      <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
      <button onClick={connectWalletHandler}>{connButtonText}</button>
      <div className="accountDisplay">
        <h3>Address: {defaultAccount}</h3>
      </div>
      <div className="balanceDisplay">
        <h3>Balance: {userBalance}</h3>
      </div>
      {errorMessage}
    </div>
  );
}

export default App;
