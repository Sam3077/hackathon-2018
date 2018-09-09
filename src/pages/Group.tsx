import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import Settings from '@material-ui/icons/Settings';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { List } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import GroupsUserItem from '../components/GroupUserItem';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const NavBar = styled.nav`
    width: 100vw;
    background-color: ${Colors.LightGray};
`
const NavBarLeft = styled.nav`
    float: left;
    flex: 0;
`

const NavBarRight = styled.nav`
    float: right;
    padding-right: 20px;
    overflow: hidden;
`
const BackArrow = styled(ArrowBack)`
    height: 500px;
    width: 500px;
`
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

class GroupsList extends React.Component {
    public render() {
        return (
            <Background>
                <NavBar>
                    <NavBarLeft>
                        <BackArrow style={{ fill: 'white', height: "50px", width: "50px" }} />
                    </NavBarLeft>
                    <NavBarRight>
                        <Settings style={{ fill: 'white', height: "50px", width: "50px" }} />
                    </NavBarRight>
                </NavBar>
                <GroupHeader>
                    <GroupPicture src={require('../pictures/group.png')} />
                    <Edit style={{ fill: 'white', height: "40px", width: "40px", backgroundColor: 'black', marginLeft: '-50px', border: "white 2px solid", borderRadius: '5px' }} />
                </GroupHeader>
                <List style={{ width: '100%', minHeight: '78vh', backgroundColor: Colors.LightGray }}>
                    <GroupsUserItem
                        icon={require('../pictures/default.png')}
                        name="Test User 1"
                        debt={+10} />
                    <GroupsUserItem
                        icon={require('../pictures/default.png')}
                        name="Test User 2"
                        debt={-5} />
                </List>
            </Background>
        );
    }
}

export default GroupsList;
