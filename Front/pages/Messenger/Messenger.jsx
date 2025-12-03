import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { Conversation, Topbar, Message, ChatOnline } from "../../Componenet";
import { AuthContext } from "../../context/AuthContext";
import "./Messenger.css";
import { useDispatch, useSelector } from "react-redux";
export const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const {  user } = useSelector((state) => state.authentication);

  useEffect(() => {
    console.log("User in Messenger:", user);
    const getConversations = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`/conversation/${user._id}`);
          setConversations(res.data);
          console.log("Conversations fetched:", res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getConversations();
  }, [user._id]);

  if (!user) {
    return <div>Loading...</div>; // Show loading state if user is null
  }

  return (
    <>
      <Topbar />
      <div className="messenger container">
        <div className="chatMenue">
          <div className="chatmenuewrapper">
            <input
              type="text"
              placeholder="search for friends"
              className="chatMenueInput"
            />
            {conversations.map((item) => (
              <Conversation key={item._id} conversation={item} currentuser={ user} />
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatboxwrapper">
            <div className="cahtboxtop">
              <Message />
              <Message own={true} />
              <Message />
              <Message />
              <Message />
              <Message />
            </div>
            <div className="chatboxbottom">
              <textarea
                className="messageInput"
                placeholder="enter your message ...."
              ></textarea>
              <button className="submitInput">Send</button>
            </div>
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatonlinewrapper">
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
};
