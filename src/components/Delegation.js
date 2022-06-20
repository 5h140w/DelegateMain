import { knownFTSO } from '../logic/web3'
import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/RemoveCircleOutline';

function Delegation(props) {

    return (
       <ListItem
         secondaryAction={
           <IconButton onClick={props.tx} edge="end" aria-label="comments">
             <DeleteIcon style={{color:'#131313',width:'33px',height:'33px'}} />
           </IconButton>
         }
         style={{padding:'25px 0',borderBottom:'1px solid #f1f1ef'}}
       >
         <ListItemIcon style={{width:'180px',fontSize:'20px',fontFamily:'Roboto',color:'#000',fontWeight:'300'}} >
           {knownFTSO[props.address.toLowerCase()] || props.address.substring(0, 6) + "..." + props.address.substring(36)}
         </ListItemIcon>
         <ListItemText primary={props.amount/100 + '%'} style={{fontSize:'20px',fontFamily:'Lena',color:'#000',fontWeight:'500'}}/>
         <ListItemText primary={(props.balance * (props.amount/10_000)).toFixed(0) + ' wSGB'} style={{fontSize:'20px',fontFamily:'Roboto',color:'#000',fontWeight:'200'}}/>
       </ListItem>

    )
}

export default Delegation
