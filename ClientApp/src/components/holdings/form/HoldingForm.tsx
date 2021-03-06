import React, { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { IHolding } from "../../../app/models/IHolding";
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface IProps {
  onCancelForm: (isAlive: boolean) => void;
  formHolding: IHolding | null;
  handleSubmit: (holding: IHolding) => Promise<unknown>;
  setSelectedHolding: (holding: IHolding) => void;
}

const reviewSchema = yup.object({
  name: yup.string().required().min(1),
})

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

  let [spinning, setSpinning] = useState<boolean>(false);

  const handleFormSubmit = (holding: IHolding) => {
    setSpinning(true);
    if (holding.id.length === 0) holding.id = uuid();
    handleSubmit(holding)
      .then((message) => {
        toast.success(`Holding ${message}`);
        onCancelForm(false);
        setSelectedHolding(holding);
        formik.resetForm();
      })
      .catch((err) => console.log(err))
      .finally(() => setSpinning(false));
  }

  const formik = useFormik({
    initialValues: initHolding(),
    onSubmit: (values, actions) => {
      handleFormSubmit(values);
    },
    validationSchema: reviewSchema
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          placeholder="Enter Name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {(formik.touched.name && formik.errors.name) && <div className="text-danger">{formik.errors.name}</div>}
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
          <Button style={{ float: 'right' }} type='submit' variant="primary" size="lg">
            Submit
          </Button>{' '}
          <Button onClick={() => formik.resetForm()} style={{ float: 'right' }} variant="secondary" size="lg">
            Clear Changes
        </Button>
        </div>
      }
    </Form>
  );
};
