import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import GameDetails from './GameDetails';
import RoomDetails from './RoomDetails';

const GameCard = ({ contract }) => {
  const [activeGames, setActiveGames] = useState([]); // Stores all active games
  const [selectedGameID, setSelectedGameID] = useState(null); // Track selected game
  const [selectedRoomID, setSelectedRoomID] = useState(null); // Track selected room

  // Fetch active games and their sorted rooms on mount and contract updates
  useEffect(() => {
    const fetchGames = async () => {
      const activeGameIDs = await contract.getActiveGames();
      const gameDetails = await Promise.all(
        activeGameIDs.map(async (gameID) => {
          const game = await contract.getGameById(gameID);
          const rooms = await contract.getRoomsByGameId(gameID);
          rooms.sort((a, b) => a.entryFee - b.entryFee);
          return { ...game, rooms };
        })
      );
      setActiveGames(gameDetails);
    };
    fetchGames();
  }, [contract]);

  // Handle game selection and reset room selection
  const handleGameChange = (e) => {
    setSelectedGameID(e.target.value);
    setSelectedRoomID(null);
  };

  // Handle room selection
  const handleRoomChange = (e) => {
    setSelectedRoomID(e.target.value);
  };

  // Join selected room
  const joinSelectedRoom = async () => {
    if (!selectedGameID || !selectedRoomID) {
      alert('Please select a game and room!');
      return;
    }
    try {
      await contract.joinGameRoom(selectedGameID, selectedRoomID, {
        value: ethers.utils.parseEther( // Convert entry fee to ETH
          activeGames.find((game) => game.gameID === selectedGameID).rooms.find(
            (room) => room.roomID === selectedRoomID
          ).entryFee
        ),
      });
      alert('Joined room successfully!');
      // ... Handle successful joining ...
    } catch (error) {
      console.error(error);
      alert('Error joining room!');
      // ... Handle error ...
    }
  };

  // Render game list, selected game details, and room selection
  return (
    <div className="game-card">
      <h2>Active Games</h2>
      <select onChange={handleGameChange}>
        <option value="">Choose Game...</option>
        {activeGames.map((game) => (
          <option key={game.gameID} value={game.gameID}>
            {game.teamA} vs. {game.teamB}
          </option>
        ))}
      </select>
      {selectedGameID && (
        <>
          <GameDetails gameID={selectedGameID} contract={contract} />
          <h3>Rooms for {selectedGameID}:</h3>
          <select onChange={handleRoomChange}>
            <option value="">Choose Room...</option>
            {activeGames.find((game) => game.gameID === selectedGameID).rooms.map(
              (room) => (
                <option key={room.roomID} value={room.roomID}>
                  Room {room.roomID} (Entry Fee: {ethers.utils.formatEther(room.entryFee)} ETH)
                </option>
              )
            )}
          </select>
          {selectedRoomID && (
            <RoomDetails roomID={selectedRoomID} contract={contract} />
          )}
          <button onClick={joinSelectedRoom}>Join Room</button>
        </>
      )}
    </div>
  );
};

export default GameCard;
