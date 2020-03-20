import React, { useState, useEffect } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { IHolding } from "../../../app/models/IHolding";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  formHolding: IHolding | null;
  handleSubmit: (holding: IHolding) => Promise<unknown>;
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
  let [spinning, setSpinning] = useState<boolean>(false);
  let [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  useEffect(() => {
     setSubmitDisabled(holding.name.length < 1);
  }, [holding])


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.currentTarget;
    setHolding({ ...holding, [name]: value });
  }

  const handleFormSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setSpinning(true);
    if (holding.id.length === 0) holding.id = uuid();
    handleSubmit(holding)
      .then((message) => {
        toast.success(`Holding ${message}`); 
        onCancelForm(false);
        setSelectedHolding(holding);
      })
      .catch((err) => console.log(err))
      .finally(() => setSpinning(false));
  }

  return (
    <Form className="border border-primary">
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control required type="text" placeholder="Enter Name" name="name" onChange={handleInputChange} value={holding.name} />
        <div className="text-danger">{holding.name.length < 1 ? "Must enter a name" : null}</div>
      </Form.Group>
      {spinning ?
        <div className="d-flex justify-content-center">
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        </div>
        :
        <div className="mb-2">
          <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg" onClick={handleFormSubmit} disabled={submitDisabled}>
            Submit
        </Button>{' '}
          <Button onClick={() => onCancelForm(false)} style={{ float: 'right' }} variant="secondary" size="lg">
            Cancel
        </Button>
        </div>
      }
    </Form>
  );
};
