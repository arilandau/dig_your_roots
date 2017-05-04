import React, { Component }  from 'react';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { Row, Column } from 'react-foundation';
import { railsAssetImagePath } from './../constants/railsAssetImagePath';
import NavBarLinks from './../components/NavBarLinks';
import { postAuthorizeRequestSuccess, postAuthorizeRequestFailure } from '../actions/postAuthorize';
import FlashMessage from '../components/FlashMessage';

class LayoutContainer extends Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    let storedUserData = Cookies.get('userData');
    if(storedUserData != undefined) {
      this.props.loadUserData( JSON.parse(storedUserData) );
    }
  }

  signOut() {
    Cookies.remove('userData')
    this.props.clearUserData();
    let storedUserData = Cookies.get('userData');
    this.props.redirectUserToWelcome()
  }

  render() {
    let titleTextAndImage, navBarLinks;

    if(this.props.userLoggedIn) {
      titleTextAndImage =
      (
        <h1 className="man">
          Jesse
          <Link to="/">
            <img className="mhs mbs" src={railsAssetImagePath("anchor-white.png")}></img>
          </Link>
          David
        </h1>
      )
      navBarLinks = <NavBarLinks signOut={this.signOut}/>
    } else {
      titleTextAndImage =
      (
        <h1 className="man mbl pbl">
          Jesse
          <Link to="/">
            <img className="mhs mbs" src={railsAssetImagePath("anchor-white.png")}></img>
          </Link>
          David
        </h1>
      )
    }

    return(
      <div>
        < FlashMessage fromPage={this.props.fromPage} />
        <div className="top-bar small-nav nav-wrapper">
          <div className="top-bar-title text-center">
            { titleTextAndImage }
            { navBarLinks }
          </div>
        </div>
        <div id="body-container">
          <Row className="react-layout text-center">
            <Column small={12} medium={10} offsetOnMedium={1} className="small-opaque main-text-area">
              { this.props.children }
            </Column>
          </Row>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (store) => {
  return {
    userLoggedIn: store.userLoggedIn
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    loadUserData: (userData) => { dispatch(postAuthorizeRequestSuccess(userData)) },
    clearUserData: () => { dispatch(postAuthorizeRequestFailure()) },
    redirectUserToWelcome: () => { dispatch(push('/')) }
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps
)(LayoutContainer);
