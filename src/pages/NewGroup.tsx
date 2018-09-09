import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import 'firebase/firestore';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;
const NavBar = styled.div`
    width: 100vw;
`
const Title = styled.h1`
    width: fit-content;
    color: ${Colors.StandardText};
    margin: 0px auto;
    padding-top: 7px;
`;

const AddForm = styled.div`
    width: 40%;
    margin: 0 auto;
`;

const GroupHeader = styled.div`
    clear: both;
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
`

const GroupPicture = styled.img`
    height: 200px;
    width: 200px;
    background-color: #fff;
    border-radius: 50%;
    border: ${Colors.LightGray} 5px solid;
`
const EmailTitle = styled.p`
    margin-bottom: 5px;
    color: ${Colors.StandardText}
`

class NewGroup extends React.Component{
    public state = {
        emails: [],
        uid: '',
        authenticated: true
    }

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({ uid: user.uid });
            } else {
                this.setState({ authenticated: false });
            }
        });
    }

    render() {
        const { emails } = this.state;

        return (
            <Background>
                {!this.state.authenticated ? <Redirect to="/" /> : <div />}
                <NavBar >
                    <Link to="/GroupsList" style={{ float: "left" }}><ArrowBack style={{ fill: 'white', height: "50px", width: "50px" }} /></Link>
                    <Title>Create New Group</Title>
                    <AddForm>
                        <GroupHeader>
                            <GroupPicture src={require('../pictures/group.png')} />
                            <Edit style={{ fill: 'white', height: "40px", width: "40px", backgroundColor: 'black', marginLeft: '-50px', border: "white 2px solid", borderRadius: '5px' }} />
                        </GroupHeader>
                        <FormControl style={{ width: '100%', margin: '0 auto' }}>
                            <InputLabel style={{color: Colors.StandardText}} htmlFor="adornment-amount">Group Name</InputLabel>
                            <Input style={{color: Colors.StandardText}}/>
                        </FormControl>
                        <FormControl style={{ width: '100%', margin: '0 auto' }}>
                        <EmailTitle>Add Users By Email:</EmailTitle>
                                <ReactMultiEmail
                                    emails={emails}
                                    onChange={(_emails: string[]) => {
                                        this.setState({ emails: _emails });
                                    }}
                                    getLabel={(
                                        email: string,
                                        index: number,
                                        removeEmail: (index: number) => void,
                                    ) => {
                                        return (
                                            <div data-tag key={index}>
                                                {email}
                                                <span data-tag-handle onClick={() => removeEmail(index)}>×</span>
                                            </div>
                                        );
                                    }}
                                />
                                <br />
                        </FormControl>
                        <Button variant="contained" style={{ backgroundColor: Colors.DarkGreen, marginTop: '20px' }}>
                            Create Group
                            </Button>
                    </AddForm>
                </NavBar>
            </Background>
        )
    }
}

export default NewGroup;