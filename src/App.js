import React from 'react';
import Chatbot from './Chatbot';
import DotGrid from './DotGrid';
import './App.css'; // Add global styles like background color

function App() {
  return (
    <div className="app-container">
      <DotGrid
        dotSize={10}
        gap={15}
        baseColor="#1a1a1a"
        activeColor="#7c3aed" // Thunder Purple
        proximity={120}
        shockRadius={250}
        shockStrength={6}
        resistance={750}
        returnDuration={1.5}
      />
      <div className="chatbot-overlay">
        <Chatbot />
      </div>
    </div>
  );
}

export default App;
