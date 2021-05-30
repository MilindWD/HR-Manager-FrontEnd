import React from "react";
import { Col, Form, Row } from "react-bootstrap";

const FormInput = ({ displayName, initialValue, canEdit, handler }) => {
  return (
    <Form.Group as={Row}>
      <Form.Label column xs="6" className="prim-blue">
        {displayName}
      </Form.Label>
      <Col xs="6">
        <Form.Control readOnly={!canEdit} defaultValue={initialValue} onChange={(e) => { handler(e.target.value); console.log(`setting ${displayName}`); }} />
      </Col>
    </Form.Group>
  );
};

export default FormInput;
