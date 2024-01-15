import { X } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import "./ErrorToast.scss";

const SuccessToast = ({ success }) => {
  const [display, setDisplay] = useState(true);
  useEffect(() => {
    if (success !== false) setDisplay(true);
  }, [success]);
  return (
    <>
      {display && (
        <ToastContainer
          className="p-4 error-toast success-toast"
          position="bottom-end"
          style={{ zIndex: 1 }}
        >
          <Toast>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Success</strong>
              <button
                className="close-btn"
                onClick={() => {
                  setDisplay(false);
                }}
              >
                <X />
              </button>
            </Toast.Header>
            <Toast.Body>{success}</Toast.Body>
          </Toast>
        </ToastContainer>
      )}
    </>
  );
};

export default SuccessToast;
