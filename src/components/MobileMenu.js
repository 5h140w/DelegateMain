import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Grid from '@mui/material/Grid'
import { NavLink } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function MobileMenu({open, handleClose}) {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClick={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullScreen
      >
        <Grid style={{position:'relative',width:'100%',minHeight:'100vh'}} container justifyContent='center' alignItems='center'>
          <div style={{padding:'0'}}>
            <NavLink to='/SGB/wrap' className='nav-mobile'>Wrap</NavLink>
            <NavLink to='/SGB/unwrap' className='nav-mobile'>Unwrap</NavLink>
            <NavLink to='/SGB/delegate' className='nav-mobile'>Delegate</NavLink>
            <NavLink to='/SGB/delegations' className='nav-mobile'>Your Delegations</NavLink>
          </div>
        </Grid>
      </Dialog>
    </div>
  );
}
