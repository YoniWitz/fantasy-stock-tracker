import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { IHolding } from "../../../app/models/IHolding";
import { v4 as uuid } from 'uuid';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  formHolding: IHolding | null;
  handleSubmit: (holding: IHolding) => void;
  setSelectedHolding: (holding: IHolding) => void;
}
export const HoldingForm: React.FC<IProps> = ({ onCancelForm, formHolding, handleSubmit, setSelectedHolding }) => {
  const initHolding = () => {
    if (formHolding)
      return formHolding;
    else {
      return {
        id: '',
        name: ''
      }
    }
  }
  let [holding, setHolding] = useState<IHolding>(initHolding);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.currentTarget;
    setHolding({ ...holding, [name]: value });
  }

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (holding.id.length === 0) holding.id = uuid();
    console.log(holding);
    handleSubmit(holding);
    onCancelForm(false);
    setSelectedHolding(holding);
  }

  return (
    <Form className="border border-primary">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" name="name" onChange={handleInputChange} value={holding.name} />
      </Form.Group>
      <div className="mb-2">
        <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg" onClick={handleFormSubmit}>
          Submit
        </Button>{' '}
        <Button onClick={() => onCancelForm(false)} style={{ float: 'right' }} variant="secondary" size="lg">
          Cancel
        </Button>
      </div>
    </Form>
  );
};
