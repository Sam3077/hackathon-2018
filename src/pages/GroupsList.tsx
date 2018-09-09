import * as React from "react";
import styled from "styled-components";
import Colors from "../Colors";
import GroupsListItem from '../components/GroupsListItem';
import {List, FormControl, Input, InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

const SearchContainer = styled(FormControl)`
    width: 100%;
    font-size: 300px;
`

const Search = styled(Input)`
    height: 30px;
    width: 100%;
`

const StyledSearch = styled(Search)`
    font-size: 500px;
`;

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
                        <SearchContainer>
                            <StyledSearch style={{"fontSize": "30px", "paddingBottom": "13px"}} type="search" id="input-with-icon-adornment" startAdornment={<InputAdornment position="start" style={{"marginBottom":"-20px"}}><SearchIcon /></InputAdornment>} />
                        </SearchContainer>
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
