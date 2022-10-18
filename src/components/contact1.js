import React, { useState, useEffect } from "react";
import simple_token_abi from "../abi/contractNFT.json";
import BoxCard from "./BoxCard";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateList, deleteList } from "../store/itemSlice";

const { ethers, BigNumber } = require("ethers");
function Contract1() {
  const dispatch = useDispatch();

  const [contract, setContract] = useState();
  const [contractAddress, setContractAddress] = useState();
  const [NFTName, setNFTName] = useState();
  const [listItem, setListItem] = useState();
  const [symbol, setsymbol] = useState();
  const [totalSupply, setSupply] = useState(0);
  const [transferHash, setTransferHash] = useState();
  const [isContractLoaded, setContractLoaded] = useState(false);
  const [isItemsLoaded, setItemsLoaded] = useState(false);
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  let temp_contractAddress = "0xad5A1F2B9b0B9A76BbD708036B3833558f3136B3";

  const loadContract = async () => {
    try {
      setProvider(new ethers.providers.Web3Provider(window.ethereum));

      setSigner(await provider.getSigner());

      let tempContract = new ethers.Contract(
        temp_contractAddress,
        simple_token_abi,
        signer
      );
      setContract(tempContract);

      setNFTName(await contract.name());
      setsymbol(await contract.symbol());
      setContractAddress(await contract.address);
      let tempTotalsupply = await contract.totalSupply();
      tempTotalsupply = tempTotalsupply.toNumber();
      setSupply(tempTotalsupply);

      // console.log(NFTName, symbol, totalSupply, await contract.tokenURI(0));
      //console.log(contract);

      setContractLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchItemData = async () => {
    let temp = [];
    let count = 0;
    let index = 0;
    let tokenURI;

    while (count < totalSupply) {
      let check = false;
      try {
        tokenURI = await contract.tokenURI(index);
        count++;
        check = true;
      } catch (error) {
        // console.log(error.code);
        // if (error.code === 32603) {
        //   console.log("ERROR +");
        // }
      }
      if (check) {
        console.log(tokenURI);
        const meta = await fetch(tokenURI);
        let data = await meta.json();
        data = {
          ...data,
          index: count - 1,
          tokenId: index,
        };

        //console.log("->", data);

        temp.push(data);
      }
      index++;
    }
    // console.log("-X", temp);
    return temp;
  };

  const loadItems = async () => {
    let temp_listItem = await fetchItemData();
    console.log("-Y", temp_listItem);
    setListItem(temp_listItem);
    console.log("-D", listItem);

    setItemsLoaded(true);
    // console.log(listItem);

    saveToStore(temp_listItem);
  };

  const saveToStore = (para_list) => {
    dispatch(updateList(para_list));
  };

  useEffect(() => {
    // Update the document title using the browser API
    setListItem(listItem);
  }, [listItem]);

  return (
    <div className="flex flex-col items-center">
      <h4> {"Contract"} </h4>
      <h4> {contractAddress} </h4>
      <button
        className="p-2
        bg-blue-500
        rounded-md"
        onClick={() =>
          loadContract().then(() => {
            loadItems();
          })
        }
      >
        hello {contractAddress}{" "}
      </button>
      <h4>BOX CARD</h4>

      <div className="grid grid-cols-3 gap-5 mb-4 justify-items-stretch">
        {isContractLoaded &&
          isItemsLoaded &&
          listItem.map((item, index) => {
            return (
              <Link
                to={`nft/${contractAddress}/${index}/${item.tokenId}`}
                key={index}
              >
                <BoxCard item={item} key={index} />
              </Link>
            );
          })}
      </div>
    </div>
  );
}

export default Contract1;
