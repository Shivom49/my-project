import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  // Fetch previous messages
  useEffect(() => {
    axios.get("http://localhost:5000/api/messages").then((res) => {
      setMessages(res.data);
    });
  }, []);

  // Listen for messages from server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      // ✅ Ignore if message is from same sender
      if (data.senderId !== socket.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Cleanup listener to prevent duplicates
    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Auto-scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!user || !text) return;

    const messageData = { user, text, senderId: socket.id };

    // Add instantly to own chat
    setMessages((prev) => [...prev, messageData]);

    // Send to server
    socket.emit("send_message", messageData);
    setText("");
  };

  return (
    <div
      style={{
        backgroundColor: "#1e1e1e",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div
        style={{
          width: "400px",
          backgroundColor: "#f8f8f8",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: "#333",
          }}
        >
          💬 ChatBox (Axios + Socket.io)
        </h2>

        {/* Message area */}
        <div
          style={{
            height: "320px",
            overflowY: "auto",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          {messages.length === 0 && (
            <p style={{ textAlign: "center", color: "#777" }}>
              No messages yet...
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                margin: "6px 0",
                display: "flex",
                justifyContent: msg.user === user ? "flex-end" : "flex-start",
              }}
            >
              <div
                style={{
                  backgroundColor: msg.user === user ? "#4a90e2" : "#e5e5e5",
                  color: msg.user === user ? "white" : "black",
                  padding: "8px 12px",
                  borderRadius: "15px",
                  maxWidth: "75%",
                }}
              >
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Inputs */}
        <div
          style={{
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <input
            placeholder="Your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <input
              placeholder="Type a message..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              style={{
                flex: "1",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#4a90e2",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 14px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
