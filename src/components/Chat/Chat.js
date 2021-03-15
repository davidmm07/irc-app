import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

const ENDPOINT = 'https://c89b9f7eb38a.ngrok.io/chat';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('joinRoom', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      const today = new Date();
      message.currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ' at ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      setMessages(messages => [ ...messages, message ]);
    });
    socket.on("previousResults", (results) => {
      setResults(results);
    })
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', {name:name.toLowerCase(),room:room.toLowerCase(),text:message});
      setMessage('');
    }
  }

  const sendMedia = (event, actual) => {
    event.preventDefault();
    if(actual){
      socket.emit('sendMedia',{name:name.toLowerCase(),room:room.toLowerCase(),media:actual});
      setResults([]);
    }
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} results={results} setResults={setResults} sendMedia={sendMedia} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
      </div>
      <TextContainer users={users}/>
    </div>
  );
}

export default Chat;
