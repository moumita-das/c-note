import {
  Mic,
  PauseIcon,
  PauseOctagon,
  Play,
  StopCircle,
  XOctagon,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import "./RecorderToast.scss";

const RecorderToast = ({ saveHandler, deleteHandler, existingRecord }) => {
  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true,
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedStrumURL, setRecordedStrumURL] = useState(null);
  const audio = document.querySelector("audio");
  const timeline = document.querySelector(".timeline");
  function toggleAudio() {
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }
  useEffect(() => {
    if (!existingRecord) return;
    setRecordedStrumURL(existingRecord);
  }, [existingRecord]);
  useEffect(() => {
    if (!audio) return;
    if (!mediaBlobUrl) return;
    setRecordedStrumURL(mediaBlobUrl);
  }, [mediaBlobUrl]);
  useEffect(() => {
    if (!recordedStrumURL) return;
    function changeTimelinePosition() {
      const percentagePosition = (100 * audio.currentTime) / audio.duration;
      timeline.style.backgroundSize = `${percentagePosition}% 100%`;
      timeline.value = percentagePosition;
    }
    audio.ontimeupdate = changeTimelinePosition;
    audio.onended = function () {
      setIsPlaying(false);
    };
    function changeSeek() {
      const time = (timeline.value * audio.duration) / 100;
      audio.currentTime = time;
    }
    timeline.addEventListener("change", changeSeek);
  }, [recordedStrumURL]);
  return (
    <>
      <ToastContainer
        className="p-4 general-toast"
        position="bottom-end"
        style={{ zIndex: 1 }}
      >
        <Toast>
          <Toast.Header closeButton={false}>RECORD</Toast.Header>
          <Toast.Body>
            <div className="rec-container">
              {!isRecording ? (
                <button
                  className="btn btn-start"
                  onClick={() => {
                    setIsRecording(true);
                    startRecording();
                  }}
                  type="button"
                >
                  <Mic />
                </button>
              ) : (
                <button
                  className="btn btn-stop"
                  onClick={() => {
                    setIsRecording(false);
                    stopRecording();
                  }}
                  type="button"
                >
                  <XOctagon />
                </button>
              )}
              <audio src={recordedStrumURL} />
              <div className="controls">
                <button
                  className="btn player-button"
                  onClick={toggleAudio}
                  disabled={recordedStrumURL ? false : true}
                >
                  {!isPlaying ? <Play /> : <PauseOctagon />}
                </button>
                <input
                  type="range"
                  className="timeline"
                  max="100"
                  value="0"
                  onChange={() => {}}
                />
              </div>
            </div>
            <div className="modal-controls">
              <button
                className="btn"
                onClick={() => {
                  saveHandler(recordedStrumURL);
                }}
              >
                SAVE
              </button>
              <button
                className="btn"
                style={{ fontSize: "0.8em" }}
                onClick={deleteHandler}
              >
                DELETE
              </button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
};

export default RecorderToast;
