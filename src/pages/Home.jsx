import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import SongsList from "./SongsList";

import "./Home.scss";
import SongDetails from "./SongDetails";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState([]);
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
        navigate(`/song/${id}`, { state: { selectedSong: res } });
      });
  };
  return (
    <Layout>
      <div className="home">
        <SongsList songList={songs} clickHandler={fetchSongById} />
      </div>
    </Layout>
  );
};

export default Home;
