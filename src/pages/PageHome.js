import React, { useState, useEffect } from "react";

import Contract1 from "../components/contact1";
const { ethers } = require("ethers");

function PageHome() {
  return (
    <div>
      <Contract1 defaultAccount={1} />
    </div>
  );
}

export default PageHome;
