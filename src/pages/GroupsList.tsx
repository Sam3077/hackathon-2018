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
    width: 100vw;
    background-color: ${Colors.LightGray};
    display: flex;
    flex-direction: row;
`
const NavBarLeft = styled.nav`
    flex: 0;
`

const NavBarRight = styled.nav`
    align-self: center;
    flex: 1;
    padding-right: 20px;
    overflow: hidden;
`

const ProfPic = styled.img`
    margin: 10px;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    border: ${Colors.DarkBackground} 2px solid;
`

const SearchContainer = styled(FormControl)`
    font-size: 300px;
    width: 100%;
`

const Search = styled(Input)`
    height: 30px;
    min-width: 0px;
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
                            <StyledSearch fullWidth={true} placeholder="Search" style={{"fontSize": "30px", "paddingBottom": "13px"}} type="search" id="input-with-icon-adornment" startAdornment={<InputAdornment position="start" style={{"marginBottom":"-20px"}}><SearchIcon /></InputAdornment>} />
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
