import Drawer from '@mui/material/Drawer';
import { Button, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function AddAddress(props){
    
    const handleClose = () => {
      
        props.setStatus(!props.status)
        props.setPageRefresh(!props.pageReferesh)
    }

    const drawerList=()=>{
        return(<div>
            <span style={{ display: 'flex', marginLeft:6, fontSize: 22, fontWeight: 'bold', fontFamily: 'Kanit',marginTop:20 }}>Add Address <div style={{marginLeft:'60%',cursor:'pointer'}} onClick={handleClose}><CloseIcon /></div></span>
            
            <div style={{ fontFamily: 'Kanit', fontSize: '1em', color: 'grey', marginLeft:6, display: 'flex',marginTop:12 }}>{props?.userData?.username} Enter your Address details</div>
            <div>
                <List  style={{display:'flex',justifyContent:'center',flexDirection:'column',textAlign:'center'}}>
                    <ListItem >
                        <ListItemText>
                            <TextField label="Address Line One" variant="standard" style={{width:'90%'}} />
                        </ListItemText>
                    </ListItem>
                    <ListItem >
                        <ListItemText>
                            <TextField label="Address Line Two" variant="standard" style={{width:'90%'}} />
                        </ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText><TextField label="Landmark" variant="standard" style={{width:'90%'}}/></ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText><TextField label="Pincode" variant="standard" style={{width:'90%'}}/></ListItemText>
                    </ListItem>

                    <ListItem >
                        <ListItemText>
                            <TextField label="State" variant="standard"  style={{width:'41%',marginRight: '5%'}}/>
                            <TextField label="City" variant="standard" style={{width:'45%'}}/>
                        </ListItemText>
                    </ListItem>
            
                  
                    
                    <ListItem >
                        <ListItemText>
                        <Button variant="contained"  style={{ fontSize: 12, background: '#006266', marginTop: 10, borderRadius: 20,width:'90%' }}>Save & Proceed</Button>
                        </ListItemText>
                    </ListItem>
                     
                </List>
            </div>
        </div>)
    }

    return(<div >
    <Drawer
        anchor={'right'}
        open={props.status}
        onClose={handleClose}
        
      >
        {drawerList()}
      </Drawer>
      </div>)
}