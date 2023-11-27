// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './components/Homepage';

function App() {
  const [isAdmin, setIsAdmin] = useState(true); // Set to true for testing, replace with actual logic
  const [isRoomOwner, setIsRoomOwner] = useState(true); // Set to true for testing, replace with actual logic

  const createGame = () => {
    // Add logic to call the createGame function in your smart contract
    console.log('Creating game...');
  };

  const createRoom = () => {
    // Add logic to call the createRoom function in your smart contract
    console.log('Creating room...');
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          render={() => (
            <HomePage isAdmin={isAdmin} isRoomOwner={isRoomOwner} createGame={createGame} createRoom={createRoom} />
          )}
        /> 
      </Routes>       
    </Router>
  );
}

export default App;
