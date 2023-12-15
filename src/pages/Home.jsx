import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import SongsList from "./SongsList";

import "./Home.scss";
import SongDetails from "./SongDetails";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [selectedSong, setSelectedSong] = useState(null);
  useEffect(() => {
    if (songs.length > 0) return;
    fetch("http://127.0.0.1:8000/fetch_all_saved_chords", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        setSongs(res);
      });
  }, []);
  const fetchSongById = (id) => {
    fetch("http://127.0.0.1:8000/fetch_song_by_id?id=" + id, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        setSelectedSong(res);
      });
  };
  console.log(songs);
  return (
    <Layout>
      <div className="home">
        {selectedSong === null ? (
          <SongsList songList={songs} clickHandler={fetchSongById} />
        ) : (
          <SongDetails selectedSong={selectedSong} />
        )}
      </div>
    </Layout>
  );
};

export default Home;
