import React from 'react';
import { connect } from 'react-redux';
import RsvpAttendingQuestionsWrapper from '../components/RsvpAttendingQuestionsWrapper';
import RsvpNotAttendingQuestions from '../components/RsvpNotAttendingQuestions';

const RsvpAdditionalQuestionsContainer = (props) => {
  let additionalQuestions;
  if( props.attending === "Yes") {
    additionalQuestions = (
      <RsvpAttendingQuestionsWrapper
        plusOne={ props.plusOne }
        eventHasFood={ props.eventHasFood }
        foodChoice={ props.foodChoice }
        formError={ props.formError }
      />
    )
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
    formValues.foodChoice = store.form.emailConfirmation.values.foodChoice
    formValues.error = store.form.emailConfirmation.error
  }

  return {
    plusOne: store.emailConfirmation.guest.plusOneInvited,
    eventHasFood: store.emailConfirmation.event.foodOptions,
    attending: formValues.rsvp,
    foodChoice: formValues.foodChoice,
    formError: formValues.error
  }
}

export default connect(
  mapStateToProps,
  {}
)(RsvpAdditionalQuestionsContainer)
