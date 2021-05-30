import React from "react";
import { Alert } from "react-bootstrap";

const AlertMessage = ({ message, visible }) => {
  if (visible) {
    return <Alert variant="danger">{message}</Alert>;
  } else return (<div></div>)
};

export default AlertMessage;
