import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Switch from "../components/Switch";
import { Headphones, Mic, Pause, PauseCircle, Play, X } from "lucide-react";
import ErrorToast from "../components/ErrorToast";
import RecorderToast from "../components/RecorderToast";

const ChordsEditor = ({ songObj }) => {
  const audioRef = React.useRef();
  const [songDisplayElement, setSongDisplayElement] = useState([]);
  const [controlsDisplayed, setControlsDisplayed] = useState(false);
  const [textAlignment, setTextAlignment] = useState("left");
  const [capo, setCapo] = useState("");
  const [strum, setStrum] = useState("uduudu");
  const [recordedStrum, setRecordedStrum] = useState(null);
  const [generatedStrum, setGeneratedStrum] = useState({});
  const [recordClick, setRecordClick] = useState(false);
  const [toastError, setToastError] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  async function saveStrumRecording(mediaBlobUrl) {
    // const blob = new Blob([mediaBlobUrl], { type: "audio/wav" });
    let blob = await fetch(mediaBlobUrl).then((r) => r.blob());
    setRecordedStrum(blob);
    setRecordClick(false);
  }
  function deleteStrumRecording() {
    setRecordedStrum(null);
    setRecordClick(false);
  }

  function fetchSound() {
    let context = new AudioContext();
    const playButton = document.querySelector("#play");
    if (strum.trim() === "" && !recordedStrum) {
      setToastError("Please enter strumming pattern to play");
      return;
    }
    if (recordedStrum) {
      let fileReader = new FileReader();
      let arrayBuffer;

      fileReader.onloadend = () => {
        arrayBuffer = fileReader.result;
        context.decodeAudioData(arrayBuffer, (audioBuffer) => {
          play(audioBuffer);
          setIsPlaying(true);
        });
      };

      fileReader.readAsArrayBuffer(recordedStrum);
      return;
    } else {
      if (generatedStrum.hasOwnProperty(strum)) {
        play(generatedStrum[[strum]]);
        setIsPlaying(true);
      } else {
        fetch("http://localhost:8000/fetch_sound_for_strum", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pattern: strum,
          }),
        })
          .then((response) => response.arrayBuffer())
          .then((arrayBuffer) => context.decodeAudioData(arrayBuffer))
          .then((audioBuffer) => {
            // playButton.disabled = false;
            generatedStrum[[strum]] = audioBuffer;
            play(audioBuffer);
            setIsPlaying(true);
          });
      }
    }
    setToastError(false);

    function play(audioBuffer) {
      audioRef.current = null;
      audioRef.current = new AudioBufferSourceNode(context, {
        buffer: audioBuffer,
      });
      audioRef.current.connect(context.destination);
      audioRef.current.loop = true;
      audioRef.current.start();
    }
  }
  function stop() {
    if (audioRef.current) {
      audioRef.current.stop();
    }
  }

  const flexRowList = [];
  let flexRow = [];
  useEffect(() => {
    songObj.map((item) => {
      if (item.type != "new-line" && item.id < songObj.length) {
        flexRow.push({
          ...item,
        });
      } else {
        flexRowList.push(flexRow);
        flexRow = [];
      }
    });
    setSongDisplayElement(flexRowList);
  }, [songObj]);
  return (
    <>
      {!controlsDisplayed ? (
        <div
          className="controls-heading"
          onClick={() => {
            setControlsDisplayed(true);
          }}
        >
          Settings
        </div>
      ) : (
        <div className="controls-top">
          <p>Settings</p>
          <div className="box">
            <h6>Align</h6>
            <Switch
              trueState="RIGHT"
              falseState="LEFT"
              handleChange={(state) => {
                setTextAlignment(state ? "right" : "left");
              }}
            />
          </div>
          <div className="box">
            <h6>Capo on</h6>
            <input
              id="capo-input"
              className="form-control customInput"
              type="number"
              value={capo}
              onChange={(e) => {
                const numberEntered = parseInt(e.target.value);
                if (numberEntered > 22) setCapo(22);
                else if (numberEntered <= 0) setCapo("");
                else setCapo(numberEntered);
              }}
            />
          </div>
          <div className="box">
            <h6>Strumming Pattern</h6>
            <div className="input-with-icon">
              <input
                id="strum-input"
                className="form-control customInput"
                value={strum}
                onChange={(e) => {
                  if (audioURL != "") setAudioURL("");
                  setStrum(e.target.value);
                }}
              />
              <div className="">
                {isPlaying ? (
                  <PauseCircle
                    onClick={() => {
                      setIsPlaying(false);
                      stop();
                    }}
                  />
                ) : (
                  <Play
                    id="play"
                    onClick={() => {
                      fetchSound();
                    }}
                  />
                )}

                <Mic
                  onClick={() => {
                    setRecordClick(true);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="control-bottom">
            <button
              className="btn customBtn"
              onClick={() => {
                setControlsDisplayed(false);
              }}
            >
              Minimize
            </button>
          </div>
        </div>
      )}

      <ul className="flex-list">
        {songDisplayElement.map((row) => {
          return (
            <li className="flex-row">
              {row.map((child) => (
                <div className="flex-box" style={{ textAlign: textAlignment }}>
                  <div className="chord">{child?.chord}</div>
                  <div className="verse">{child?.verse}</div>
                </div>
              ))}
            </li>
          );
        })}
      </ul>
      {toastError && <ErrorToast error={toastError} />}
      {recordClick && (
        <RecorderToast
          saveHandler={saveStrumRecording}
          deleteHandler={deleteStrumRecording}
          existingRecord={recordedStrum}
        />
      )}
    </>
  );
};

export default ChordsEditor;
