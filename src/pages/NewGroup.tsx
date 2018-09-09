import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import {Redirect, Link} from 'react-router-dom';
import * as firebase from 'firebase/app';
import ArrowBack from '@material-ui/icons/ArrowBack';
import 'firebase/firestore';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;
const NavBar = styled.div`
    width: 100vw;
    padding: 10px;
    display: inline-block;
`
const Title = styled.h1`
    color: ${Colors.StandardText};
`;

class NewGroup extends React.Component {
    public state = {
        uid: '',
        authenticated: true
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({uid: user.uid});
            } else {
                this.setState({authenticated: false});
            }
        });
    }

    render() {
        return (
            <Background>
                {!this.state.authenticated ? <Redirect to="/" /> : <div />}
                <NavBar >
                    <Link to="/GroupsList"><ArrowBack style={{ fill: 'white', height: "50px", width: "50px" }} /></Link>
                    <Title>Create New Group</Title>
                </NavBar>
            </Background>
        )
    }
}

export default NewGroup;