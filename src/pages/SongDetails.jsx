import React, { useState, useEffect } from "react";
import {
  Headphones,
  Mic,
  Octagon,
  Pause,
  PauseCircle,
  Play,
  X,
} from "lucide-react";
var myInterval;
const SongDetails = ({ selectedSong }) => {
  const audioRef = React.useRef();
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(0);
  const speedList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const lines = JSON.parse(selectedSong.lyrics_chords);
  const scroll = (speed) => {
    window.scrollBy({
      top: speed,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    myInterval = setInterval(() => scroll(scrollSpeed), 100);
  }, [scrollSpeed]);
  const playRecording = async () => {
    const base64Response = await fetch(
      `data:image/jpeg;base64,${selectedSong.recording}`
    );
    const blob = await base64Response.blob();

    let context = new AudioContext();
    let fileReader = new FileReader();
    let arrayBuffer;

    fileReader.onloadend = () => {
      arrayBuffer = fileReader.result;
      context.decodeAudioData(arrayBuffer, (audioBuffer) => {
        play(audioBuffer);
        setIsPlaying(true);
      });
    };
    fileReader.readAsArrayBuffer(blob);
    function play(audioBuffer) {
      audioRef.current = null;
      audioRef.current = new AudioBufferSourceNode(context, {
        buffer: audioBuffer,
      });
      audioRef.current.connect(context.destination);
      audioRef.current.loop = true;
      audioRef.current.start();
    }
  };
  function pauseRecording() {
    if (audioRef.current) {
      audioRef.current.stop();
      setIsPlaying(false);
    }
  }

  return (
    <div className="details">
      <div className="lyrics">
        <h3>{selectedSong.title}</h3>
        <ul>
          {lines.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
      </div>
      <div className="controls">
        <div className="flex-box">
          <div className="label">Capo</div>
          <div className="value">{selectedSong.capo}</div>
        </div>
        <div className="flex-box">
          <div className="label">Strum</div>
          <div className="value">{selectedSong.strum}</div>
        </div>

        {selectedSong.recording ? (
          <div className="flex-box">
            <div className="label">Recording</div>
            <div className="value" id="btn">
              <button
                className="customBtn"
                onClick={() => {
                  if (!isPlaying) playRecording();
                  else pauseRecording();
                }}
              >
                {!isPlaying ? (
                  <Play color="#fff" />
                ) : (
                  <PauseCircle color="#fff" />
                )}
              </button>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="flex-box">
          <div className="label">Scroll</div>
          <div className="value">{scrollSpeed}</div>
        </div>
        <ul>
          {speedList.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setScrollSpeed(item);
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SongDetails;
