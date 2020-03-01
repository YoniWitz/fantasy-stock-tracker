import React from "react";
import { Form, Button } from "react-bootstrap";

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
}
export const HoldingForm: React.FC<IProps> = ({ onCancelForm }) => {
  return (
    <Form className="border border-primary">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" />
      </Form.Group>
      <div className="mb-2">
        <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg">
          Submit
        </Button>{' '}
        <Button onClick={() => onCancelForm(false)} style={{ float: 'right' }} variant="secondary" size="lg">
          Cancel
        </Button>
      </div>
    </Form>
  );
};
