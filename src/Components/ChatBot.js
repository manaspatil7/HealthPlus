import React, { useState } from 'react';
import axios from 'axios';
import './ChatBot.css';  // Optional: Use this file to style the component

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to toggle chat window
  const [message, setMessage] = useState('');          // User message
  const [chatMessages, setChatMessages] = useState([]); // List of chat messages

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSend = async () => {
    if (message.trim() === '') return; // Ignore empty messages

    // Add user message to the chat
    const newChatMessages = [...chatMessages, { sender: 'user', text: message }];
    setChatMessages(newChatMessages);
    setMessage('');

    try {
      // Send message to the backend and get a response
      const response = await axios.post('http://127.0.0.1:5000/chat', { message });
      const botMessage = response.data.response;

      // Add the bot's response to the chat
      setChatMessages([...newChatMessages, { sender: 'bot', text: botMessage }]);
    } catch (error) {
      console.error("Error communicating with the backend:", error);
      setChatMessages([...newChatMessages, { sender: 'bot', text: "Sorry, I'm having trouble understanding you." }]);
    }
  };

  return (
    <div>
      {/* Chat icon in the bottom right */}
      <div className="chat-icon" onClick={toggleChat}>
        💬
      </div>

      {/* Chat window that opens on click */}
      {isChatOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Healthcare ChatBot</span>
            <button onClick={toggleChat} className="close-btn">✕</button>
          </div>
          <div className="chat-body">
            {chatMessages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="chat-input"
            />
            <button onClick={handleSend} className="send-btn">Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
