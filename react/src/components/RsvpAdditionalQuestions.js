import React from 'react';
import { connect } from 'react-redux';
import RsvpAttendingQuestions from './RsvpAttendingQuestions';
import RsvpNotAttendingQuestions from './RsvpNotAttendingQuestions';

const RsvpAdditionalQuestions = (props) => {
  let additionalQuestions;
  if( props.attending === "Yes") {
    additionalQuestions = <RsvpAttendingQuestions plusOne={ props.plusOne }/>
  } else if( props.attending === "No"){
    additionalQuestions = <RsvpNotAttendingQuestions />
  }
  return(
    <div>
      { additionalQuestions }
    </div>
  )
}

let mapStateToProps = (store) => {
  let formValues = { rsvp: false };
  if(store.form.emailConfirmation.values != undefined){
    formValues.rsvp = store.form.emailConfirmation.values.rsvp
  }

  return {
    attending: formValues.rsvp,
    plusOne: store.emailConfirmation.guest.plusOneInvited
  }
}

export default connect(
  mapStateToProps,
  {}
)(RsvpAdditionalQuestions)
