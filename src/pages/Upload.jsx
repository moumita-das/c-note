import React from "react";
import Layout from "./Layout";
import Form from "react-bootstrap/Form";

import "./Upload.scss";

const LyricsEditor = () => {
  return (
    <Form.Group
      className="mb-3 form-group"
      controlId="exampleForm.ControlTextarea1"
    >
      <Form.Label>Example textarea</Form.Label>
      <Form.Control as="textarea" rows={3} />
    </Form.Group>
  );
};

const Upload = () => {
  return (
    <Layout>
      <div className="upload__wrapper">
        <div className="lyrics_wrapper">
          <LyricsEditor />
        </div>
        <div className="chords_wrapper">chords</div>
      </div>
    </Layout>
  );
};

export default Upload;
