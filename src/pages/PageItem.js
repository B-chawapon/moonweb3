import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateList, deleteList } from "../store/itemSlice";
import BoxCard from "../components/BoxCard";
import Etherscan from "../components/ApiEtherscan";
const { ethers } = require("ethers");

function PageItem() {
  const { listItem } = useSelector((state) => state.listItemNFT);

  console.log("--D3", listItem);
  listItem.map((item, index) => {
    console.log("ITEM: ", item, "Index: ", index);
  });
  const temp = useParams();
  console.log("--X", temp);
  const { contractAddress, index, tokenId } = useParams();

  return (
    <div>
      hello
      <div>{contractAddress}</div>
      <div>{index}</div>
      <div>{tokenId}</div>
      <Etherscan />
      <BoxCard item={listItem[index]} key={index} />
    </div>
  );
}

export default PageItem;
