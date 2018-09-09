import * as React from 'react';
import {ListItem, FormControl, InputLabel, Input, IconButton} from '@material-ui/core';
import DeleteForever from '@material-ui/icons/DeleteForever';
import styled from 'styled-components';
import Colors from '../Colors';

const ItemText = styled.div`
    display: flex;
    flex-direction: row;
    justifyContent: space-between;
    width: 100%;
`;

type Props = {
    name: string | null,
    amount: string | null,
    onDelete: () => void
}
const TransactionListItem = ({name, amount, onDelete}: Props) => (
    <ListItem button={false} >
        <ItemText>
            <FormControl fullWidth={true} style={{marginRight: "10px"}}>
                <InputLabel style={{color: Colors.StandardText}}>Item</InputLabel>
                <Input defaultValue={name || ''} fullWidth={true} style={{color: Colors.StandardText}}/>
            </FormControl>
            <FormControl fullWidth={true} style={{marginLeft: "10px"}}>
                <InputLabel style={{color: Colors.StandardText}}>Amount</InputLabel>
                <Input 
                    startAdornment={<p style={{marginBottom: "5px", marginRight: "2px", marginTop: "5px"}}>$</p>} 
                    type="number" 
                    fullWidth={true} 
                    defaultValue={amount || ''}
                    style={{color: Colors.StandardText}}
                    onChange={event => {
                        if (event.target.value != '') {
                            const num = parseFloat(event.target.value);
                            let newNum = num;
                            if (num * 100 % 1 != 0) {
                                newNum = Math.floor(num * 1000) / 100;
                            }
                            
                            if (event.target.value[event.target.value.length] == '0') {
                                event.target.value = newNum.toString() + "0";
                            } else {
                                event.target.value = newNum.toString();
                            }
                        }
                    }}/>
            </FormControl>
            <IconButton onClick={() => onDelete()}><DeleteForever style={{color: Colors.LightRed}}/></IconButton>
        </ItemText>
    </ListItem>
);

export default TransactionListItem;
