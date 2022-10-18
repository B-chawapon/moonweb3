import "./App.css";
import AppHeader from "./components/AppHeader";
import PageHome from "./pages/PageHome";
import PageItem from "./pages/PageItem";
import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Counter } from "./store/Counter";
const { ethers } = require("ethers");

// const web3 = new Web3(Web3.givenProvider || "http://localhost:3000");
const provider = new ethers.providers.Web3Provider(window.ethereum);

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Routes>
        {/* <Route path="/" element={<Counter />} /> */}
        <Route path="/" element={<PageHome />} />
        <Route
          path="/nft/:contractAddress/:index/:tokenId"
          element={<PageItem />}
        />
      </Routes>
    </div>
  );
}

export default App;
