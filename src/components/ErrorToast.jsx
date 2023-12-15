import { X } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import "./ErrorToast.scss";

const ErrorToast = ({ error }) => {
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    if (error !== false) setDisplay(true);
  }, [error]);
  return (
    <>
      {display && (
        <ToastContainer
          className="p-4 error-toast"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Oooppss</strong>
              <button
                className="close-btn"
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <X />
              </button>
            </Toast.Header>
            <Toast.Body>{error}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default ErrorToast;
