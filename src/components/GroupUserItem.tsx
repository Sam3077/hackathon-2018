import * as React from 'react';
import {ListItem, IconButton} from '@material-ui/core';
import styled from 'styled-components';
import Colors from '../Colors';
import MoreVert from '@material-ui/icons/MoreVert'

const ItemText = styled.div`
    display: flex;
    flex-direction: row;
    justifyContent: space-between;
    width: 100%;
    border-bottom: ${Colors.LightGray} 0.5px solid;
    margin-left: 20px;
`;
const GroupIcon = styled.img`
    border-radius: 50%;
    border: ${Colors.LightGray} 2px solid;
    height: 60px;
    flex: 0;
`;
const Title = styled.h1`
    flex: 1;
    text-align: left;
    align-self: center;
    color: ${Colors.StandardText}
`
const Debt = styled.h2`
    flex: 1
    text-align: center;
    align-self: center;
    color: ${({color}: {color: any}) => (color)}
`
const Options = styled(IconButton)`
    align-self: center;
    fontSize: 500px;
`
const TriDot = styled(MoreVert)`
    color: ${Colors.StandardText};
`

type Props = {
    name: string, 
    icon: any,
    debt: number
}
const GroupsListItem = ({name, icon, debt}: Props) => (
    <ListItem button={true} style={{width: '95%', backgroundColor: Colors.DarkBackground, margin: '10px auto'}}>
        <GroupIcon src={icon} />
        <ItemText>
            <Title>{name}</Title>
            <Debt color={debt >= 0 ? Colors.LightRed : Colors.LightGreen}>{debt >= 0 ? "You owe " : "You are owed "}{"$" + Math.abs(debt)}</Debt>
            <Options onClick={event => {
                event.stopPropagation();
            }} onTouchStart={event => { event.stopPropagation()}}><TriDot/></Options>
        </ItemText>
    </ListItem>
);

export default GroupsListItem;
