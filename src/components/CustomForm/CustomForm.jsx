import React from "react";
import { Form } from "react-bootstrap";

const CustomForm = props => {
  let fields = props.formProps.fields;

  console.log(fields);
  return (
    <div>
      <h3>{props.formProps.title}</h3>
      <Form>
        {fields.map(f => {
          return (
            <Form.Group>
              <Form.Label>{f.label}</Form.Label>
              <Form.Control
                onChange={f.changeAction}
                type={f.type}
              ></Form.Control>
            </Form.Group>
          );
        })}
      </Form>
    </div>
  );
};

export default CustomForm;
