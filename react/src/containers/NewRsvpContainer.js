import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { getEmailConfirmation } from '../actions/getEmailConfirmation';
import RsvpWelcome from '../components/RsvpWelcome';
import RsvpEventDetails from '../components/RsvpEventDetails';
import RsvpForm from '../components/RsvpForm';

class NewRsvpContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let token = this.props.token;
    this.props.getEmailConfirmation(token);
  }

  render() {
    let event = this.props.eventDetails;

    return(
      <div id="rsvp-page">
        <RsvpWelcome
          firstName={ this.props.guest.firstName }
          rsvpDescription={ event.rsvpDescription }
        />
        <RsvpEventDetails event={ event } />
        <RsvpForm />
      </div>
    )
  }
}

let mapStateToProps = (store, ownProps) => {
  return {
    token: ownProps.params.token,
    guest: store.emailConfirmation.guest,
    eventDetails: store.emailConfirmation.event
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    getEmailConfirmation: (token) => { dispatch(getEmailConfirmation(token)) }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewRsvpContainer)
