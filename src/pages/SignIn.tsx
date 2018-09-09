import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import CircularProgress from "@material-ui/core/CircularProgress";

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
const BottomPortion = MenuPortion.extend`
  justify-content: flex-start;
  background-color: rgba(0, 0, 0, 0.25);
  padding-top: 10px;
`

class SignIn extends React.Component {
  public state = {
    loaderHidden: false
  };

  private ui = new firebaseui.auth.AuthUI(firebase.auth());

  public componentDidMount() {
    this.ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.setState({loaderHidden: false});
          return false;
        },
        uiShown: () => {
          this.setState({loaderHidden: true});
        }
      },
      signInFlow: 'popup',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,
      signInOptions: [
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
