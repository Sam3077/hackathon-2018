import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";

import * as firebase from "firebase";
import * as firebaseui from "firebaseui";

import "firebaseui/dist/firebaseui.css";

firebase.initializeApp({
  apiKey: "AIzaSyA1yIN51yoEkvpGLWLYiJvVWfhK7gdG2jY",
  authDomain: "groupsplit-2c2b5.firebaseapp.com",
  projectId: "groupsplit-2c2b5",
});
const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

const Loader = styled.div`
  display: ${({hidden}: {hidden: boolean}) => hidden ? 'none' : 'block'}
`
const Title = styled.h1`
  color: ${Colors.StandardText};
  textAlign: center;
`

class SignIn extends React.Component {
  public state = {
    loaderHidden: false
  };

  private ui = new firebaseui.auth.AuthUI(firebase.auth());

  public componentDidMount() {
    this.ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult(authResult, redirectUrl) {
          // User successfully signed in.
          // Return type determines whether we continue the redirect automatically
          // or whether we leave that to developer to handle.
          return false;
        },
        uiShown: () => {
          this.setState({loaderHidden: true});
        }
      },
      // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
      signInFlow: 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        {
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
					requireDisplayName: false
				},
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      ],
    });
  }

  public render() {
    return (
    <Background >
      <Title>GroupSplit</Title>
      <div id="firebaseui-auth-container" />
      <Loader hidden={this.state.loaderHidden}>Loading...</Loader>
    </Background>
    );
  }
}

export default SignIn;
