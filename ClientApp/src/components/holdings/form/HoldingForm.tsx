import React from "react";
import { Form, Container } from "react-bootstrap";

export const HoldingForm = () => {
  return (
      <Form className="border border-primary">
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
        </Form.Group>
      </Form>
  );
};
