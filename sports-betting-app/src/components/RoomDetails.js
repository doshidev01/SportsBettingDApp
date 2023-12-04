import React, { useState, useEffect } from 'react';

const RoomDetails = ({ roomID, contract }) => {
  const [roomInfo, setRoomInfo] = useState(null); // Stores fetched room data

  // Fetch details of the selected room on mount and roomID changes
  useEffect(() => {
    const fetchRoomDetails = async () => {
      const info = await contract.getRoomById(roomID); // Use dedicated function
      setRoomInfo(info);
    };
    fetchRoomDetails();
  }, [roomID, contract]);

  // Render room details if available
  if (!roomInfo) return <p>Loading room details...</p>;

  return (
    <>
      <h3>Room {roomID} Details:</h3>
      <p><strong>Participants:</strong></p>
      <ul>
        {roomInfo.participants.map((participant) => (
          <li key={participant}>{participant}</li>
        ))}
      </ul>
      <p><strong>Bets (simplified):</strong></p>
      <ul>
        {roomInfo.bets.map((bet) => (
          <li key={bet}>
            {bet.user}: {bet.amount} ETH on {bet.team}
          </li>
        ))}
      </ul>
      {/* ... Add more detailed bet information like odds, winners, etc. ... */}
    </>
  );
};

export default RoomDetails;
