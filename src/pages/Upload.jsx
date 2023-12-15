import React from "react";
import Layout from "./Layout";
import Form from "react-bootstrap/Form";

import "./Upload.scss";
import { useState } from "react";
import { useEffect } from "react";
import ChordsEditor from "./ChordsEditor";

const LyricsEditor = ({ value, changeHandler }) => {
  return (
    <Form.Group className="form-group" controlId="exampleForm.ControlTextarea1">
      <Form.Label>Enter here</Form.Label>
      <Form.Control
        as="textarea"
        rows={3}
        value={value}
        onChange={changeHandler}
      />
    </Form.Group>
  );
};

const Upload = () => {
  const [lyrics, setLyrics] = useState("");
  const [lyricsWithChords, setLyricsWithChords] = useState([]);
  function isLineChord(line) {
    const numSpaces = line.length - line.replaceAll(" ", "").length;
    const numNonSpaces = line.replaceAll(" ", "").length;
    return numSpaces > numNonSpaces;
  }
  function isLineInfo(line) {
    const word = line
      .replaceAll("(", "[")
      .replaceAll(")", "]")
      .replaceAll("{", "[")
      .replaceAll("}", "]")
      .trim();
    if (["[Intro]", "[Verse]", "[Chorus]", "[Outro]"].indexOf(word) >= 0)
      return true;
    return false;
  }
  useEffect(() => {
    if (lyrics.trim().length == 0) return;
    const upDatedLyrics = lyrics + "\n";
    if (
      upDatedLyrics.indexOf("(") >= 0 &&
      upDatedLyrics.indexOf(")") &&
      upDatedLyrics.substring(
        upDatedLyrics.indexOf("("),
        upDatedLyrics.indexOf(")").length < 4
      ) >= 0
    ) {
      const split1Tokens = upDatedLyrics.split("(");
      const split2Tokens = [];
      for (let i = 0; i < split1Tokens.length; i++) {
        let token = split1Tokens[i];
        if (token === "") {
        } else {
          if (token.indexOf(")") > 0) {
            const splitVerse = token.split(")");
            split2Tokens.push({
              id: split2Tokens.length,
              type: "chord",
              chord: splitVerse[0],
              text:
                splitVerse[1].indexOf("\n") >= 0
                  ? splitVerse[1].substring(0, splitVerse[1].indexOf("\n"))
                  : splitVerse[1],
            });
            if (splitVerse[1].indexOf("\n") >= 0) {
              split2Tokens.push({
                id: split2Tokens.length,
                type: "new-line",
              });
              split2Tokens.push({
                id: split2Tokens.length,
                type: "chord",
                chord: "",
                text: splitVerse[1].substring(
                  splitVerse[1].indexOf("\n") + 1,
                  splitVerse[1].length
                ),
              });
            }
          } else {
            split2Tokens.push({
              id: split2Tokens.length,
              type: "chord",
              chord: "",
              text: token,
            });
          }
          if (token.indexOf("\n") > 0) {
            split2Tokens.push({
              id: split2Tokens.length,
              type: "new-line",
            });
          }
        }
      }
      setLyricsWithChords(split2Tokens);
    } else {
      let split1Tokens = upDatedLyrics.split("\n");
      // const isFirstLineChord = isLineChord(split1Tokens[0]);
      // const isLastLineChord = isLineChord(
      //   split1Tokens[split1Tokens.length - 1]
      // );
      // let isSwitchNeeded = false;
      // if (isFirstLineChord && !isLastLineChord) {
      //   // no action to be taken as chords come before verse
      // } else if (isFirstLineChord && isLastLineChord) {
      //   // if both first and last lines are chords, consider that chords come after verse
      //   split1Tokens = [""].concat(split1Tokens);
      //   isSwitchNeeded = true;
      // } else if (!isFirstLineChord && isLastLineChord) {
      //   isSwitchNeeded = true;
      // }
      // if (isSwitchNeeded) {
      //   for (let i = 0; i < split1Tokens.length; i += 2) {
      //     let temp = split1Tokens[i];
      //     split1Tokens[i] = split1Tokens[i + 1];
      //     split1Tokens[i + 1] = temp;
      //   }
      // }
      const split2Tokens = [];
      for (let i = 0; i < split1Tokens.length; i++) {
        let lineType;
        if (split1Tokens[i]) lineType = "chord";
        else if (isLineInfo(split1Tokens[i])) lineType = "info";
        else lineType = "verse";

        split2Tokens.push({
          id: split2Tokens.length,
          type: lineType,
          text: split1Tokens[i],
        });

        // let chordLine = split1Tokens[i];
        // let verseLine = split1Tokens[i + 1];
        // const chordList = chordLine.split(" ");
        // chordList.map((chord, listIndex) => {
        //   if (chord == "") {
        //     return;
        //   }

        //   const index = chordLine.indexOf(chord);
        //   split2Tokens.push({
        //     id: split2Tokens.length,
        //     type: "chord",
        //     chord: chord,
        //     verse:
        //       listIndex + 1 < chordList.length
        //         ? verseLine.substring(0, index + 1)
        //         : verseLine,
        //   });
        //   chordLine = chordLine.substring(index + 1, chordLine.length);
        //   verseLine = verseLine.substring(index + 1, verseLine.length);
        // });
        // split2Tokens.push({
        //   id: split2Tokens.length,
        //   type: "new-line",
        // });
      }
      setLyricsWithChords(split2Tokens);
    }
  }, [lyrics]);
  return (
    <Layout>
      <div className="upload__wrapper">
        <div className="lyrics_wrapper col-4">
          <LyricsEditor
            value={lyrics}
            changeHandler={(e) => {
              setLyrics(e.target.value.replaceAll("\n\n", "\n"));
            }}
          />
        </div>
        <div className="chords_wrapper col-8">
          <ChordsEditor songObj={lyricsWithChords} />
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
