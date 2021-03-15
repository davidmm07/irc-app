import React from 'react';

import './Message.css';

import ReactEmoji from 'react-emoji';

const Message = ({ message: { text, user, currentDate }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();
  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }
  if(typeof text === "string"){
    return (
      isSentByCurrentUser
        ? (
          <div>
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
            </div>
          </div>
              <div className="messageDate">Sent: {currentDate}</div>
              </div>
          )
          : (
            <div>
            <div className="messageContainer justifyStart">
              <div className="messageBox backgroundLight">
                <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
              </div>
              <p className="sentText pl-10 ">{user}</p>
            </div>
            <div className="messageDate">Sent: {currentDate}</div>
            </div>
          )
    );
  }else if (text.type === "gif"){
    return (
      isSentByCurrentUser
        ? (
          <div>
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">You</p>
            <div className="gitItem messageBox backgroundBlue">
            <img src={text.images.downsized.url} />
            </div>
          </div>
          <div className="messageDate">Sent: {currentDate}</div>
          </div>
          )
          : (
            <div>
            <div className="messageContainer justifyStart">
              <div className="gitItem messageBox backgroundLight">
              <img src={text.images.downsized.url} />
              </div>
            </div>
            <div className="messageDate">Sent: {currentDate}</div>
            </div>
          )
    ); 
  }
  return null;


}

export default Message;