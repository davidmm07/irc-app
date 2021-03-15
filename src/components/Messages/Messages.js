import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from './Message/Message';

import './Messages.css';
import PreviousMedia from './PreviousMedia/PreviousMedia';

const Messages = ({ messages, name, results, setResults, sendMedia}) => (

  <ScrollToBottom className="messages">
    <div className="child">
    {messages.map((message, i) => <div key={i}><Message message={message} name={name}/></div>)}
      <div><PreviousMedia results={results} setResults={setResults} sendMedia={sendMedia}/></div>
    </div>
  </ScrollToBottom>

);

export default Messages;