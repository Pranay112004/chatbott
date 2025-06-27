import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { evaluate } from 'mathjs';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  const addMessage = (text, isUser) => {
    setMessages(prev => [...prev, { text, isUser }]);
  };

  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    try {
      const result = evaluate(text);
      return `The answer is ${result}`;
    } catch {}

    if (lowerText.includes('pnr')) {
      return 'You can check your PNR status at https://www.irctc.co.in';
    } else if (lowerText.includes('train') && lowerText.includes('schedule')) {
      return 'Please tell me the train number or name to check its schedule.';
    } else if (lowerText.includes('fare')) {
      return 'Mention source, destination, and class to check fare.';
    } else if (lowerText.includes('cancel')) {
      return 'Use IRCTC portal to cancel tickets. Need help? Ask me.';
    } else if (lowerText.includes('hello') || lowerText.includes('hi')) {
      return 'Hi! Welcome to Railway Support Chat.';
    } else if (lowerText.includes('bye')) {
      return 'Goodbye! Safe travels!';
    } else {
      return 'I didn’t catch that. You can ask about PNR, schedule, or fares!';
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    addMessage(input, true);
    const response = getBotResponse(input);
    setTimeout(() => addMessage(response, false), 500);
    setInput('');
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">Railway Chat Support</div>
      <div className="chat-box" id="chat-box" ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.isUser ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          id="user-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Type a message..."
        />
        <button id="send-btn" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
