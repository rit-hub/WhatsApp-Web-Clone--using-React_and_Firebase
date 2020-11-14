import React, { useState, useEffect } from "react";
import firebase from "firebase";
import "../Style/SidebarChat.css";
import { Avatar, IconButton} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { database } from "../Auth/firebase";
import { useStateValue } from "../Auth/StateProvider";
function SidebarChat() {
  const [input, setinput] = useState("");
  const { roomid } = useParams();
  const [roomname, setroomname] = useState("");
  const [message, setmessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (roomid) {
      database
        .collection("rooms")
        .doc(roomid)
        .onSnapshot((snapshot) => setroomname(snapshot.data().name));
      database
        .collection("rooms")
        .doc(roomid)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setmessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomid]);

  const SendMessage = (event) => {
    event.preventDefault();

    database.collection("rooms").doc(roomid).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setinput("");
  };

  return (
    <div className="sidebarChat">
      <div className="sidebarChat__header">
      <Avatar />
        <div className="sidebarChat__headerinfoleft">
          <h3>{roomname}</h3>
          <p>
            last seen{" "}
            {new Date(
              message[message.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="sidebarChat__header__inforight">
        <IconButton><SearchIcon /></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <IconButton><MoreVertIcon /></IconButton>
        </div>
      </div>
      <div className="sidebarChat__body">
        {message.map((message) => (
          <p
            className={`sidebarChat__message ${
              message.name === user.displayName && `sidebarChat__messagerecierver`
            }`}
          >
            <span className="sidebarChat__username">{message.name}</span>
            {message.message}
            <span className="sidebarChat__messagetimestamp ">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="sidebarChat__footer">
      <IconButton><SentimentVerySatisfiedIcon /></IconButton>
        <form>
          <input
            value={input}
            onChange={(event) => setinput(event.target.value)}
            placeholder="Type your message here"
          />
          <button onClick={SendMessage} type="submit">
          <IconButton><SendIcon /></IconButton>
          </button>
        </form>
        <IconButton><MicIcon /></IconButton>
      </div>
    </div>
  );
}

export default SidebarChat;
