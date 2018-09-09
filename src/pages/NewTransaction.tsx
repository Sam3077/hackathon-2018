import * as React from 'react';
import {List, Button, IconButton} from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import TransactionListItem from '../components/TransactionListItem';
import styled from 'styled-components';
import Colors from "../Colors";

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

class NewTransaction extends React.Component {
    itemsArray = [{name: '', amount: ''}];
    props: {location: any}

    componentDidMount() {
        const data = this.props.location.state.incomingData;
        for (let i = 0; i < data.responses.length; i++) {
            console.log(data.responses[i]);
        }
    }
    render() {
        return (
            <Background>
                <List>
                    {this.itemsArray.map((item, key) => (
                        <TransactionListItem key={key} name={item.name} amount={item.amount} onDelete={() => {
                            console.log(key);
                            this.itemsArray = this.itemsArray.slice(0, key).concat(this.itemsArray.slice(key + 1, this.itemsArray.length));
                            this.forceUpdate();
                        }}/>
                    ))}
                    <IconButton style={{marginLeft: "20px"}} onClick={() => {
                        this.itemsArray.push({name: '', amount: ''});
                        this.forceUpdate();
                    }}><AddCircleOutline style={{color: Colors.StandardText}}/></IconButton>
                </List>
                <Button 
                    style={{backgroundColor: Colors.LightGreen, borderRadius: "5px", marginLeft: "5px"}}><h3 style={{margin: "0px"}}>Save</h3></Button>
            </Background>
        )
    }
}

export default NewTransaction;