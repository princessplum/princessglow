import React, { useState } from "react";

const API_KEY = import.meta.env.OPENAI_API_KEY;

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I’m your PrincessGlow assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Oops! Something went wrong 😢" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-white hover:bg-pink-600 text-white p-4 rounded-full shadow-lg text-2xl"
        >
          <img
            src="/img/star.png"
            alt="Chat"
            className="w-6 h-6 object-contain"
          />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold text-pink-600">GlowBot</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
          </div>
          <div className="h-60 overflow-y-auto bg-pink-50 rounded-lg p-2 border border-gray-200 mb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "bot"
                    ? "bg-pink-100 text-left"
                    : "bg-pink-500 text-white ml-auto text-right"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
            />
            <button
              onClick={handleSend}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-r-lg"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
