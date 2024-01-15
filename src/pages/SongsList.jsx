import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";

const SongsList = ({ songList, clickHandler }) => {
  const [displayedList, setDisplayedList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  useEffect(() => {
    if (searchItem === "") setDisplayedList(songList);
    else {
      setTimeout(() => {
        const updatedList = songList.filter(
          (item) =>
            item.title.toLowerCase().indexOf(searchItem.toLowerCase()) >= 0
        );
        setDisplayedList(updatedList);
      }, 1000);
    }
  }, [songList, searchItem]);
  return (
    <div className="list">
      <div className="list-controls">
        <p>Songs in your list</p>
        <div className="search-wrapper">
          <input
            className="form-control search"
            placeholder="Search..."
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
          <Search color="#468b97" size={20} />
        </div>
      </div>
      <div className="table-wrapper">
        <table class="table">
          <thead>
            <tr>
              <th scope="col-3">Name</th>
              <th scope="col">Capo</th>
              <th scope="col">Strum</th>
            </tr>
          </thead>
          <tbody>
            {displayedList.map((item) => (
              <tr
                onClick={() => {
                  clickHandler(item.id);
                }}
              >
                <td>{item.title}</td>
                <td>{item.capo}</td>
                <td>{item.strum}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongsList;
