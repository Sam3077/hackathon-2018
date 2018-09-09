import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import Input from "@material-ui/core/Input";
import GroupsListItem from '../components/GroupsListItem';
import List from '@material-ui/core/List';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

const NavBar = styled.nav`
    width: 100%;
    height: 75px;
    background-color: ${Colors.LightGray};
`
const NavBarLeft = styled.nav`
    float: left;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
`

const NavBarRight = styled.nav`
    font-size: 5em;
    padding: 20px;
    float: right;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    width: 88%;
`

const ProfPic = styled.img`
    margin: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: ${Colors.DarkBackground} 2px solid;
`
const Search = styled(Input)`
    height: 30px;
    width: 100%;
`

class GroupsList extends React.Component {
    public state = {

    };

    public render() {
        return (
            <Background>
                <NavBar>
                    <NavBarLeft>
                        <ProfPic src={require('../pictures/default.png')} />
                    </NavBarLeft>
                    <NavBarRight>
                        <Search type="search"/>
                    </NavBarRight>
                </NavBar>
                <List>
                    <GroupsListItem 
                        icon={require('../pictures/default.png')} 
                        name="Test!" 
                        debt={-5}/>
                </List>
            </Background>
        );
    }
}

export default GroupsList;
