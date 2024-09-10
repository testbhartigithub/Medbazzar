import { AppBar ,Badge} from "@mui/material";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import mainlogo from '../../../src/assets/medbazzar-logo.png'
import ShopingCartIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import Cookies from "js-cookie";

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import { useStyles } from '../userinterface/HomeCss';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import Drawer from '@mui/material/Drawer';
import { useState } from "react";
import { serverURL } from '../../services/FetchNodeServices';
import { useNavigate } from "react-router-dom";

import { List,ListItem, ListItemButton,ListItemText ,ListItemIcon } from '@mui/material';
import { Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'
import DraftsIcon from '@mui/icons-material/Drafts'
import { useSelector  } from 'react-redux'
import ShowCartProducts from "./ShowCartProducts";
import { Diversity1TwoTone } from "@mui/icons-material";
import MultiiDiv from "./MultiDiv"


export default function Header(){
  
  var navigate=useNavigate()
  var classes=useStyles()

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [status ,setStatus]=useState(false)
  const [isOpenDiv ,setIsOpenDiv]=useState(false)
  const [isOpen ,setIsOpen]=useState(false)

  const [pattern,setPattern]=useState('')
  try{
  var prd=JSON.parse(Cookies.get('CART'))
  }
  catch{
    prd={}
  }
  
  
  var products=useSelector((state)=>state.data)
  var keys=Object?.keys(prd)

  var user=useSelector((state)=>state.user)
  var userData=''
  try{
  userData=Object.values(user)[0].username.split(' ')
  userData=userData[0]
  }catch(e){

  }



  const handleDrawerOpen=()=>{
    setStatus(true)
  }

  const handleDrawerClose=()=>{
    setStatus(false)
  }
  
  const showcart=()=>{
    
    setIsOpen(!isOpen)
   
  }

  const hidecart=()=>{
    setIsOpen(false)
    setIsOpenDiv(false)
  }

  const showDivcart=()=>{
    setIsOpenDiv(!isOpenDiv)
  }

  const hideDivcart=()=>{
    setIsOpenDiv(false)
  }

  const handleFilterPage=()=>{
    navigate(`/filterpage/${pattern}`)

  }

  const handleEnter=(e)=>{
    if(e.key=="Enter")
    navigate(`/filterpage/${e.target.value}`)

  }


 function handleNavigate(){

    navigate('/cart')
  }

  const DrawerList=()=>{
    return(  <Paper>
      <div className={classes.leftBarStyle}>
      <img src={`${serverURL}/images/beauty.png`} width='70%'/>
        <div className={classes.nameStyle}>{'Bharat'}</div>   
        <div  className={classes.emailStyle}>{'Singhamb32@gmail.com'}</div>
        <div  className={classes.phoneStyle}>+91{'8770862975'}</div>
   </div>
   <div>
      <List>
          <Divider />
          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                 <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText>DashBoard</ListItemText>
              </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText >Category List</ListItemText>
              </ListItemButton>
          </ListItem> 

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText>Sub Category</ListItemText>
              </ListItemButton>
          </ListItem> 

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallbrand')}>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText>Brands List</ListItemText>
              </ListItemButton>
          </ListItem> 

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayallproducts')}>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText>Product List</ListItemText>
              </ListItemButton>
          </ListItem> 

          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/dashboard/displayproductdetails')}>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText>Product Details List</ListItemText>
              </ListItemButton>
          </ListItem> 

          <Divider/>

          <ListItem disablePadding>
              <ListItemButton>
                  <ListItemIcon>
                 <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText>LogOut</ListItemText>
              </ListItemButton>
          </ListItem> 

         
      </List>

  </div>
</Paper>
)
  }
  const seconderySearchBar=()=>{

    return(<div>
      <Box sx={{ flexGrow: 1 }}>
   <AppBar style={{background:'#fff'}} position="static">
     <Toolbar style={{display:'flex',justifyContent:'space-between'}} >
       <MenuOutlinedIcon style={{color:'black'}} onClick={handleDrawerOpen}   />
      {searchBar()}
       <div style={{ display:'flex',width:60,justifyContent:'space-between',}}>
       
       <PhoneOutlinedIcon style={{color:'black'}} />
       <div style={{display:'flex',flexDirection:'column',width:'30%',color:'black'}}>
       <PersonOutlinedIcon onClick={()=>navigate('/signin')} style={{color:'black'}} />
       <div style={{display:'flex',width:'100%',justifyContent:'center',fontSize:13}}>{userData}</div>
    
       </div>
       </div>
     </Toolbar>
   </AppBar>
   
 </Box>
</div>)

  }

  const searchBar=()=>{
    return(
    <Paper
    component="form"
    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width:'50%',margin:0.7 }}
  >
    
    <InputBase
      sx={{ ml: 1, flex: 1 }}
      placeholder="Search Products Here"
      inputProps={{ 'aria-label': 'search google maps' }}
      onChange={(e)=>setPattern(e.target.value)}
      onKeyDown={(e)=>handleEnter(e)}
     
    />
    <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      <SearchIcon onClick={handleFilterPage} />
    </IconButton>
   
  </Paper>
    )

  }

  

return(<div style={{display:'flex',width:'100vw'}}>
         <Box sx={{ flexGrow: 1,position:'relative' }} onMouseLeave={hidecart}  >
      <AppBar style={{background:'#fff'}} position="static">
        <Toolbar style={{display:'flex',justifyContent:'space-between'}} >
          < img src={mainlogo} style={{width:150}} onClick={()=>navigate('/home')}/>
         {!matches?searchBar():<div></div>}
          <div style={{ display:'flex',width:!matches?100:40,justifyContent:'space-between',}}>
          <div onMouseOver={showcart}>
          <Badge badgeContent={keys.length} color="primary">
          <ShopingCartIcon   style={{color:'black',cursor:'pointer'}}  onClick={handleNavigate} />
          </Badge>
          </div> 
         {!matches?<PhoneOutlinedIcon style={{color:'black'}} />:<div></div>}
         {!matches?<div onMouseOver={showDivcart} style={{display:'flex',flexDirection:'column',width:'30%',background:'yellow',color:'black'}}>
          <PersonOutlinedIcon     style={{color:'black',cursor:'pointer'}} />
          <div   style={{display:'flex',width:'100%',justifyContent:'center',fontSize:13}}>{userData}</div>
          </div>:<div></div>}
         
          </div>
        </Toolbar>
      </AppBar>
      <div>
        {matches?seconderySearchBar():<div></div>}
       
      </div>

      <Drawer
            anchor='left'
            open={status}
            onClose={handleDrawerClose}
          >
            {DrawerList()}
            </Drawer>
            <ShowCartProducts  isOpen={isOpen}/>
            <MultiiDiv  isOpenDiv={isOpenDiv} />
    </Box>
</div>)



}