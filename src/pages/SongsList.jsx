import React from "react";

const SongsList = ({ songList, clickHandler }) => {
  return (
    <div className="list">
      <h3>Your Saved Chords</h3>
      <ul>
        {songList.map((item) => (
          <li key={item.id}>
            <div
              className="list-box"
              onClick={() => {
                clickHandler(item.id);
              }}
            >
              <div>
                <a href="javascript:void(0)">
                  <h4>{item.title}</h4>
                </a>
              </div>
              <div className="info">
                <p>
                  Capo: <span>{item.capo}</span>
                </p>
                <p>
                  Strum: <span>{item.strum}</span>
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SongsList;
