import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaRobot } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { FiMic, FiMicOff } from 'react-icons/fi';
import './Chatbot.css'; // For animation styles

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const messagesEndRef = useRef(null);

  // Trigger welcome message on mount
  useEffect(() => {
    axios.post('http://localhost:8080/api/chat', { message: '' })
      .then(res => {
        const reply = res.data.reply || 'Hello! How can I help you today?';
        setMessages([{ text: reply, sender: 'bot' }]);
      })
      .catch(() => {
        setMessages([{ text: 'Error reaching the server.', sender: 'bot' }]);
      });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const newUserMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');

    try {
      const res = await axios.post('http://localhost:8080/api/chat', { message: input });
      const reply = res.data.reply || 'Sorry, I didn’t understand that.';
      setMessages(prev => [...prev, { text: reply, sender: 'bot' }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, { text: 'Error reaching the server.', sender: 'bot' }]);
    }
  };

  const handleVoice = () => {
    if (!recognition) return alert('Speech Recognition not supported in this browser.');

    if (!listening) {
      recognition.start();
      recognition.onresult = (event) => {
        const voiceText = event.results[0][0].transcript;
        setInput(voiceText);
        recognition.stop();
        setListening(false);
      };
      recognition.onerror = (event) => {
        console.error('Voice error:', event);
        recognition.stop();
        setListening(false);
      };
      setListening(true);
    } else {
      recognition.stop();
      setListening(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-avatar pulse">
          <FaRobot size={40} />
        </div>
        <h2>HealthBot Assistant</h2>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleVoice}>
          {listening ? <FiMicOff size={20} /> : <FiMic size={20} />}
        </button>
        <button onClick={handleSend}>
          <MdSend size={22} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;