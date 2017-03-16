import React from 'react';
import { Row, Column } from 'react-foundation';
import { Field, reduxForm } from 'redux-form';

import RsvpAdditionalQuestions from './RsvpAdditionalQuestions';
import { postEmailConfirmation } from '../actions/postEmailConfirmation';

let validate = () => {
  const errors = {};
  return errors;
}

let onSubmit = (fields, dispatch) => {
  dispatch(postEmailConfirmation());
}

const RsvpForm = (props) => {
  return(
    <div className="rsvp-form">
      <h1>Will you join us?</h1>

      <form onSubmit={props.handleSubmit}>
        <label>
          <Field name="rsvp" component="input" type="radio" value="Yes" />
          Yes
        </label>
        <label>
          <Field name="rsvp" component="input" type="radio" value="No" />
          No
        </label>

        <RsvpAdditionalQuestions />
      </form>
    </div>
  )
}

export default reduxForm({
  form: 'emailConfirmation',
  validate,
  onSubmit
})(RsvpForm);
