// src/utils/contract.js
import {Web3} from 'web3';

const getWeb3 = async () => {
  // Check if MetaMask is installed
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    await window.ethereum.enable();
  } else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
  } else {
    console.error('MetaMask not detected. Install MetaMask extension.');
  }
};

export { getWeb3 };
