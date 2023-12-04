import React, { useState, useEffect } from 'react';

const GameDetails = ({ gameID, contract }) => {
  const [gameDetails, setGameDetails] = useState(null); // Stores fetched game information

  // Fetch details of the selected game on mount and gameID changes
  useEffect(() => {
    const fetchGameDetails = async () => {
      const details = await contract.getGameDetails(gameID); // Use dedicated function
      setGameDetails(details);
    };
    fetchGameDetails();
  }, [gameID, contract]);

  // Render game details if available
  if (!gameDetails) return <p>Loading game details...</p>;

  return (
    <>
      <h3>Game Details:</h3>
      <p><strong>Winner:</strong> {gameDetails.winner ? gameDetails.winner : 'No winner yet'}</p>
      <p><strong>Active:</strong> {gameDetails.isActive ? 'Yes' : 'No'}</p>
      {/* ... Add more details like score, timestamps, etc. ... */}
    </>
  );
};

export default GameDetails;
