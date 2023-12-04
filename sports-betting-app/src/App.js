import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

import GameCard from './components/GameCard';
import GameDetails from './components/GameDetails';
import RoomDetails from './components/RoomDetails';

const App = () => {
  // Replace with your contract address and ABI
  const contractAddress = '0x...';
  const abi = [ /* ... contract ABI ... */ ];

  // Initialize ethers provider and contract instance
  const provider = ethers.getDefaultProvider();
  const contract = new ethers.Contract(contractAddress, abi, provider);

  // State to manage selected game and room
  const [selectedGameID, setSelectedGameID] = useState(null);
  const [selectedRoomID, setSelectedRoomID] = useState(null);

  return (
    <div className="App">
      <h1>My Sports Betting App</h1>

      <GameCard
        contract={contract}
        selectedGameID={selectedGameID}
        setSelectedGameID={setSelectedGameID}
        selectedRoomID={selectedRoomID}
        setSelectedRoomID={setSelectedRoomID}
      />

      {selectedGameID && <GameDetails gameID={selectedGameID} contract={contract} />}

      {selectedRoomID && <RoomDetails roomID={selectedRoomID} contract={contract} />}

      <nav>
        <a href="#">Games</a>
        <a href="#">My Bets</a>
        <a href="#">Account</a>
      </nav>

      <p>Username: johndoe</p>
      <p>Balance: 1.5 ETH</p>

      <footer>
        <a href="#">Terms & Conditions</a>
        <p>© 2023 My Sports Betting App</p>
      </footer>
    </div>
  );
};

export default App;
