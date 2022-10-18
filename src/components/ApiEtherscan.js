import React, { useState, useEffect } from "react";

function Etherscan({ item }) {
  useEffect(() => {}, []);
  const fetchContract = async () => {
    let eiei = await fetch(
      "https://api-goerli.etherscan.io/api?module=account&action=tokennfttx&address=0x6975be450864c02b4613023c2152ee0743572325&startblock=0&endblock=999999999&sort=asc&apikey=D4DPMSQ3SMTJRD3ZVU9NSVDFIHIJT7VW6U"
    );
    console.log(eiei);
  };
  return (
    <div>
      <div>API</div>
      <div>{fetchContract}</div>
    </div>
  );
}

export default Etherscan;
