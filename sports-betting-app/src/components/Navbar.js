import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Connect to the smart contract and fetch the admin address
  useEffect(() => {
    const fetchAdmin = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(contractAddress, abi, provider); // change contract address and abi
      const admin = await contract.adminAddress();
      setIsAdmin(ethers.utils.getAddress(admin) === ethers.utils.getAddress(provider.selectedAddress));
    };
    fetchAdmin();
  }, []);

  return (
    <nav className="navbar">
      <ul>
        <li><a href="#">Games</a></li>
        {isAdmin && <li><a href="#">Create Game</a></li>}
      </ul>
    </nav>
  );
};

export default Navbar;
