import * as React from 'react';
import { List, Button, IconButton } from '@material-ui/core';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import TransactionListItem from '../components/TransactionListItem';
import styled from 'styled-components';
import Colors from "../Colors";
//import { array, object } from 'prop-types';

const Background = styled.div`
  background-color: ${Colors.DarkBackground};
  height: 100%;
  min-height: 100vh;
  width: 100vw;
`;

function isNormalInteger(str: string) {
    var n = Math.floor(Number(str));
    return n !== Infinity && String(n) === str && n >= 0;
}

class NewTransaction extends React.Component {
    itemsArray = [{ name: '', amount: '' }];
    props: { location: any }

    componentDidMount() {
        const data = this.props.location.state.incomingData;
        const text = data.responses[0].textAnnotations;
        //let letters: any = [];
        let item = "";
        let price = "";
        let letters = [];
        for (let i = 1; i < text.length; i++) {
            var word = text[i].description;
            for (let j = 0; j < word.length; j++) {
                let letter = text[i].description[j];
                letters.push(letter);
            }
            letters.push(" ");
        }




        console.log(letters)
        for (var i = 0; i < letters.length; i++) {
            var letter = letters[i];
            console.log(letter == '$')
            if (letter == '$' || letter == 'S') {
                let count = 1;
                while (isNormalInteger(letters[i+count])) {
                    price += letters[i+count];
                    count++;
                }
                if (letters[i+count] == "," || letters[i+count] == ".") {
                    price += letters[i+count + 1] + letters[i+count + 2];
                    console.log(item + ": " + price);
                    this.itemsArray.push({ name: item, amount: (parseInt(price)/100).toFixed(2)});
                    this.forceUpdate();
                    price = "";
                    item = "";
                    i = i + count+2;
                }
                else {
                    count = 1;
                    price = "";
                }
            }
            else {
                item += letter;
            }
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
                        }} />
                    ))}
                    <IconButton style={{ marginLeft: "20px" }} onClick={() => {
                        this.itemsArray.push({ name: '', amount: '' });
                        this.forceUpdate();
                    }}><AddCircleOutline style={{ color: Colors.StandardText }} /></IconButton>
                </List>
                <Button
                    style={{ backgroundColor: Colors.LightGreen, borderRadius: "5px", marginLeft: "5px" }}><h3 style={{ margin: "0px" }}>Save</h3></Button>
            </Background>
        )
    }
}

export default NewTransaction;