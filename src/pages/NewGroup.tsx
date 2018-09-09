import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import { Redirect, Link } from 'react-router-dom';
import * as firebase from 'firebase/app';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit';
import { ReactMultiEmail } from 'react-multi-email';
import 'react-multi-email/style.css';
import 'firebase/firestore';
import 'firebase/functions';
const fetch = require("node-fetch");

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
`;
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
        authenticated: true,
        groupPicture: require('../pictures/group.png'),
        groupName: '',
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

    private upload: any
    render() {
        const { emails } = this.state;

        return (
            <Background>
                {!this.state.authenticated ? <Redirect to="/" /> : <div />}
                <NavBar >
                    <Link to="/GroupsList" style={{ float: "left" }}><ArrowBack style={{ fill: 'white', height: "50px", width: "50px" }} /></Link>
                    <Title>Create New Group</Title>
                    <AddForm>
                        <input style={{display: 'none'}} type="file" ref={(ref) => {this.upload = ref}} onChange={() => {
                            var file = (document.querySelector('input[type=file]') as HTMLInputElement).files![0];
                            var reader = new FileReader();
                            reader.addEventListener(
                                'load',
                                () => {
                                    this.setState({ groupPicture: reader.result });
                                },
                                false
                            );

                            if (file) {
                                reader.readAsDataURL(file);
                            }
                        }}/>
                        <GroupHeader>
                            <GroupPicture src={this.state.groupPicture} />
                            <IconButton onClick={() => {this.upload.click()}} disableRipple={true} style={{marginLeft: '-50px'}}><Edit style={{ fill: 'white', height: "40px", width: "40px", backgroundColor: 'black', border: "white 2px solid", borderRadius: '5px' }} /></IconButton>
                        </GroupHeader>
                        <FormControl style={{ width: '100%', margin: '0 auto' }}>
                            <InputLabel style={{color: Colors.StandardText}} htmlFor="adornment-amount">Group Name</InputLabel>
                            <Input onChange={elem => this.setState({groupName: elem.target.value})} style={{color: Colors.StandardText}}/>
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
                        <Button variant="contained" style={{ backgroundColor: this.state.emails.length > 0 && this.state.groupName != '' ? Colors.LightGreen : Colors.DarkGreen, marginTop: '20px' }} onClick={() => {
                            const user = firebase.auth().currentUser;
                            if (user && this.state.emails.length > 0 && this.state.groupName != '') {
                                user.getIdToken(false).then(token => {
                                    //const newGroup = firebase.functions().httpsCallable('createNewGroup');
                                    fetch("https://us-central1-groupsplit-2c2b5.cloudfunctions.net/createNewGroup", {
                                        method: "POST",
                                        body: JSON.stringify({
                                            token: token,
                                            name: this.state.groupName,
                                            image: this.state.groupPicture,
                                            members: this.state.emails                                  
                                        })
                                    }).then((res: any) => console.log(res));
                                })
                            }
                        }}>
                            Create Group
                            </Button>
                    </AddForm>
                </NavBar>
            </Background>
        )
    }
}

export default NewGroup;