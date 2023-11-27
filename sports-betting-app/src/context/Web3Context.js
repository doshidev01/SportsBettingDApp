// src/context/Web3Context.js
import { createContext, useContext, useEffect, useState } from 'react';
import { getWeb3 } from '../utils/contract';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);

  useEffect(() => {
    const initWeb3 = async () => {
      await getWeb3();
      setWeb3(window.web3);
    };

    initWeb3();
  }, []);

  return <Web3Context.Provider value={web3}>{children}</Web3Context.Provider>;
};
