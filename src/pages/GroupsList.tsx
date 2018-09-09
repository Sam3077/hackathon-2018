import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import SearchIcon from "@material-ui/icons/Search";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialAction from "../components/SpeedDialAction";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon"
import { Create, Add } from "@material-ui/icons";
import GroupsListItem from '../components/GroupsListItem';
import { Redirect, Link } from 'react-router-dom';
import { List, FormControl, Input, InputAdornment, Modal, Button } from '@material-ui/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const NavBar = styled.nav`
  position: relative;
  z-index:200;
  width: 100vw;
  background-color: ${Colors.LightGray};
  display: flex;
  flex-direction: row;
`;
const NavBarLeft = styled.nav`
  flex: 0;
`;

const NavBarRight = styled.nav`
  align-self: center;
  flex: 1;
  padding-right: 20px;
  overflow: hidden;
`;

const ProfPic = styled.img`
  margin: 10px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  border: ${Colors.DarkBackground} 2px solid;
`;

const DropDownPic = styled.img`
  display: block;
  margin: 0 auto;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: ${Colors.DarkBackground} 2px solid;
`;

const SearchContainer = styled(FormControl)`
  font-size: 300px;
  width: 100%;
`;

const Search = styled(Input)`
  height: 30px;
  min-width: 0px;
`;

const StyledSearch = styled(Search)`
  font-size: 500px;
`;

const SpeedDialContainer = styled.div`
  right: 20px;
  bottom: 20px;
  position: fixed;
`;

const DropDownContainer = styled.div`
  position: absolute;
  display: none;
  top: 78px;
  left: 5px;
  z-index:100;
  padding-top: 10px;
  background-color: #5f5f5f;
  width: 30%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

const DropDownContent = styled.ul`
  margin: 0;
  padding: 5px;
  list-style: none;
  font-weight: 900;
  color: ${Colors.StandardText};
`;

const DropDownList = styled.li`
    border-bottom: 2px solid ${Colors.LightGray}
`
const CustomModal = styled(Modal)`
    align-items: center;
    justify-content: center;
    display: flex
`;
const ModalView = styled.div`
    background-color: white;
    border-radius: 5px;
    max-width: 75vw;
`
const ModalTitle = styled.h1`
    text-align: center;
    padding: 10px;
    color: ${Colors.DarkText}
`;
const ButtonView = styled.div`
    background-color: rgba(0, 0, 0, 0.25);
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
`;
const ButtonText = styled.h2`
    text-align: center;
    align-self: center;
`;
const ButtonWrapper = styled.div`
    display: flex;
    flex: 1;
    padding 5px;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: ${Colors.Gray} 1px solid;
`;

const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });
class GroupsList extends React.Component {
    props: { history: any }
    groupsList: {icon: any, name: string, debt: number, id: string, members: Array<string>}[] = []
    public state = {
        speedDialOpen: false,
        imageUrl: require('../pictures/default.png'),
        displayName: "User",
        authenticated: true,
        modalOpen: false
    };

    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).get().then(doc => {
                    const data = doc.data();
                    if (data && data.image) {
                        this.setState({
                            imageUrl: data.image,
                            displayName: data.displayName
                        });
                    }
                });
                db.collection('users').doc(user.uid).collection("groups").get().then(snapshot => {
                    snapshot.forEach(doc => {
                        const data = doc.data();
                        if (data) {
                            this.groupsList.push({icon: data.image, name: data.displayName, debt: 0, id: doc.id, members: data.members})
                        }
                    });
                    this.forceUpdate();
                })
            } else {
                console.log("not authenticated");
                this.setState({ authenticated: false });
            }
        })
    }

    componentDidMount() {
        var shown = false;
        document.getElementById("nav-pic")!.addEventListener("click", function(){
            if(!shown){
                document.getElementById("dropdown")!.style.display = 'block';
            }
            else{
                document.getElementById("dropdown")!.style.display = 'none';
            }
            shown = !shown;
        });
    }

    public render() {
        let isTouch;
        if (typeof document !== 'undefined') {
            isTouch = 'ontouchstart' in document.documentElement;
        }
        return (
            <Background>
                {!this.state.authenticated ? <Redirect to="/" /> : <div />}
                <NavBar>
                    <NavBarLeft>
                        <ProfPic id="nav-pic" src={this.state.imageUrl} />
                    </NavBarLeft>
                    <NavBarRight>
                        <SearchContainer>
                            <StyledSearch fullWidth={true} placeholder="Search" style={{ "fontSize": "30px", "paddingBottom": "13px", color: Colors.StandardText}} type="search" id="input-with-icon-adornment" startAdornment={<InputAdornment position="start" style={{ "marginBottom": "-20px" }}><SearchIcon style={{width: "40px", height: "40px"}}/></InputAdornment>} />
                        </SearchContainer>
                    </NavBarRight>
                </NavBar>
                <DropDownContainer id="dropdown">
                    <DropDownPic src={this.state.imageUrl} />
                    <p style={{width: 'fit-content', margin: '0 auto', fontWeight: 'bolder', color:Colors.StandardText}}>{this.state.displayName}</p>
                    <DropDownContent>
                        <DropDownList>View Your History</DropDownList>
                        <DropDownList>View Your Transactions</DropDownList>
                        <DropDownList>Change Display Name</DropDownList>
                        <DropDownList style={{border: 'none'}}><Button variant="contained" onClick={() => firebase.auth().signOut()} style={{ backgroundColor: Colors.DarkGreen, margin: '5px auto', display: 'block'}}>
                            Logout
                            </Button></DropDownList>
                    </DropDownContent>
                </DropDownContainer>
                <List>
                    {this.groupsList.map((item, index) => (
                        <GroupsListItem 
                            icon={item.icon}
                            name={item.name}
                            debt={item.debt}
                            id={item.id}
                            key={index}
                            members={item.members}
                        />
                    ))}
                </List>
                <SpeedDialContainer>
                    <SpeedDial
                        ariaLabel="Actions"
                        icon={<SpeedDialIcon />}
                        open={this.state.speedDialOpen}
                        onClick={() => this.setState({ speedDialOpen: !this.state.speedDialOpen })}
                        onMouseEnter={isTouch ? undefined : () => this.setState({ speedDialOpen: true })}
                        onMouseLeave={isTouch ? undefined : () => this.setState({ speedDialOpen: false })}>
                        <SpeedDialAction icon={<Add />} tooltipTitle="Add Transaction" tooltipOpen onClick={() => this.setState({modalOpen: true})}/>
                        <SpeedDialAction icon={<Create />} tooltipTitle="Create Group" tooltipOpen onClick={() => this.props.history.push("/NewGroup")}/>
                    </SpeedDial>
                </SpeedDialContainer>
                <CustomModal open={this.state.modalOpen} onBackdropClick={() => this.setState({modalOpen: false})} onEscapeKeyDown={() => this.setState({modalOpen: false})} disableAutoFocus={true}>
                    <ModalView>
                        <ModalTitle>How would you like to enter the transaction?</ModalTitle>
                        <ButtonView>
                            <ButtonWrapper>
                                <ButtonText><Link to="/" style={{textDecoration: 'none', color: Colors.DarkText}}>Enter Manually</Link></ButtonText>
                            </ButtonWrapper>
                            <ButtonWrapper>
                                <ButtonText><Link to="/Scan" style={{textDecoration: 'none', color: Colors.DarkText}}>Scan Receipt</Link></ButtonText>
                            </ButtonWrapper>
                        </ButtonView>
                    </ModalView>
                </CustomModal>
            </Background>
        );
    }
}

export default GroupsList;
