import React, { useState } from "react";

import "./PreviousMedia.css";

const PreviousMedia = ({ results, setResults, sendMedia }) => {
  const [index, setIndex] = useState(0);
  const changeActual = (event) => {
    event.preventDefault();
    setIndex((index + 1) % results.length);
  }
  const cancelLoad = (event) => {
    event.preventDefault();
    setResults([])
  }
  if (results.length>0) {
    const trimmedName = "admin";
    const actual = results[index];
    if ((actual.type === "gif")) {
      return (
        <div className="messageContainer justifyEnd">
          <p className="sentText pr-10">{trimmedName}</p>
          <div className="gitItem messageBox backgroundLight">
            <img src={actual.images.downsized.url} />
            <div className="btn-group">
              <button className="bnt-send"  onClick={e => sendMedia(e,actual)} >Send</button>
              <button className="bnt-change" onClick={e => changeActual(e)}>Next</button>
              <button className="bnt-cancel" onClick={e => cancelLoad(e)}>Cancel</button>
            </div>
          </div>
        </div>
      );
    }
  }
  return null;
};

export default PreviousMedia;
