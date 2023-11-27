// src/components/HomePage.js
import React from 'react';
import { Button } from 'semantic-ui-react';

const HomePage = ({ isAdmin, isRoomOwner, createGame, createRoom }) => {
  return (
    <div>
      <h2>Welcome to the Sports Betting App!</h2>
      {isAdmin && (
        <Button onClick={createGame} primary>
          Create Game
        </Button>
      )}
      {isRoomOwner && (
        <Button onClick={createRoom} primary>
          Create Room
        </Button>
      )}
      {/* Add other buttons or UI components */}
    </div>
  );
};

export default HomePage;
