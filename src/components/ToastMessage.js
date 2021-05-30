import React from "react";
import { Toast } from "react-bootstrap";

const ToastMessage = ({type, title, message}) => {
  return (
      <Toast>
        <Toast.Header>
            {
                type==="normal"? '👉' : (type==="success"? '✅' : '❌' )
            }
          <strong className="mr-auto">{title}</strong>
          <small>Just now</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
  );
};

export default ToastMessage;
