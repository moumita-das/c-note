import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Trash2 } from "lucide-react";

const SongsList = ({ songList, clickHandler }) => {
  const [displayedList, setDisplayedList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const handleDelete = (e) => {
    e.stopPropagation();
    window.alert("you are about to delete");
  };
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
              <th scope="col-6">Name</th>
              <th scope="col-1">Capo</th>
              <th scope="col-2">Strum</th>
              <th scope="col-2">Chords</th>
              <th scope="col-1" className="delete"></th>
            </tr>
          </thead>
          <tbody>
            {displayedList.map((item) => (
              <tr
                onClick={() => {
                  clickHandler(item.id);
                }}
              >
                <td className="col-6">{item.title}</td>
                <td className="col-1">{item.capo}</td>
                <td className="col-2">{item.strum}</td>
                <td className="col-3">{item.chords}</td>
                <td
                  className="delete col-1"
                  onClick={(e) => {
                    handleDelete(e);
                  }}
                >
                  <Trash2 />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SongsList;
