import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

const API_URL = "http://localhost:3000/api/v1";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchMessages = async () => {
      try {
        console.log("Fetching messages...");
        const response = await axios.get(
          `${API_URL}/message/messages`,
          {
            withCredentials: true,
            headers: {
              'Accept': 'application/json'
            },
            timeout: 10000 // 10 second timeout
          }
        );
        console.log("Messages response:", response.data);
        if (response.data && response.data.messages) {
          setMessages(response.data.messages);
        } else {
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        if (!error.response) {
          setError("Network error. Please check your internet connection.");
          toast.error("Network error. Please check your internet connection.");
        } else {
          const errorMessage = error.response?.data?.message || "Failed to fetch messages";
          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <SideBar />
      <section className="page messages" style={{ backgroundColor: "#0e8797" }}>
        <h1 style={{ color: "white" }}>MESSAGES</h1>
        <div className="banner">
          {loading ? (
            <div className="loading">Loading messages...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : messages && messages.length > 0 ? (
            messages.map((element) => (
              <div className="card" key={element._id}>
                <div className="details">
                  <p>
                    First Name: <span>{element.firstName}</span>
                  </p>
                  <p>
                    Last Name: <span>{element.lastName}</span>
                  </p>
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    Message: <span>{element.message}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-messages">
              <h2>No Messages</h2>
              <p>There are no messages to display at this time.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Message;
