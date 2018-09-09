import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import {Redirect} from 'react-router';
import CircularProgress from "@material-ui/core/CircularProgress";

import * as firebase from "firebase/app";
import * as firebaseui from "firebaseui";

import "firebaseui/dist/firebaseui.css";

firebase.initializeApp({
  apiKey: "AIzaSyA1yIN51yoEkvpGLWLYiJvVWfhK7gdG2jY",
  authDomain: "groupsplit-2c2b5.firebaseapp.com",
  databaseURL: "https://groupsplit-2c2b5.firebaseio.com",
  projectId: "groupsplit-2c2b5",
  storageBucket: "groupsplit-2c2b5.appspot.com",
  messagingSenderId: "194492137783"
});
const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const Loader = styled.div`
  display: ${({hidden}: {hidden: boolean}) => hidden ? 'none' : 'block'};
  align-self: center;
`
const Title = styled.h1`
  color: ${Colors.LightGreen};
  text-align: center;
  margin-bottom: 0px;
`
const Body = styled.p`
  color: ${Colors.StandardText};
  width: 80vw;
  align-self: center;
  text-align: center;
`
const MenuPortion = styled.div`
  flex: 1;
  align-item: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  width: 100vw;
`
const BottomPortion = styled(MenuPortion)`
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.25);
  padding-top: 10px;
`
const ui = new firebaseui.auth.AuthUI(firebase.auth());
class SignIn extends React.Component {
  public state = {
    loaderHidden: false,
    authenticated: false
  };

  public componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("authenticated")
        this.setState({authenticated: true});
      }
    })

    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.setState({loaderHidden: false});
          console.log("auth in here");
          return false;
        },
        uiShown: () => {
          this.setState({loaderHidden: true});
        },
        signInFailure: (error) => {
          console.log(error);
          return new Promise((resolve, reject) => {});
        }
      },
      signInFlow: 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
    });
  }

  public render() {
    return (
    <Background >
      {this.state.authenticated ? <Redirect to="/GroupsList" /> : <div/>}
      <MenuPortion>
        <Title>Welcome to Group Split</Title>
        <Body>The easiest, fastest, and most effective way to split bills.</Body>
      </MenuPortion>
      <BottomPortion>
        <div id="firebaseui-auth-container" />
        <Loader hidden={this.state.loaderHidden}><CircularProgress variant="indeterminate"/></Loader>
      </BottomPortion>
    </Background>
    );
  }
}

export default SignIn;
