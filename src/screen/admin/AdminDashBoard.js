
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useStyles } from './AdminDashBoardCss';
import { Grid,Paper} from '@mui/material';
import { List,ListItem, ListItemButton,ListItemText ,ListItemIcon } from '@mui/material';
import { Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard'
import DraftsIcon from '@mui/icons-material/Drafts'

import { BrowserRouter as Router,Routes,Route, useNavigate } from "react-router-dom";
import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory";
import Brands from "./Brands";
import DisplayAllBrand from "./DisplayAllBrand";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from "./Product";
import DisplayAllProducts from "./DisplayAllProduct";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayProductDetails";
import Banners from "./Banner";
import Concern from "../../../src/screen/admin/Concern"
import { serverURL } from '../../services/FetchNodeServices';






export function DashBoard(){
var navigate=useNavigate()
var classes=useStyles()
var adminData=JSON.parse(localStorage.getItem('ADMIN'))
// alert(JSON.stringify(adminData))


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Grid container space={3} style={{paddingInlineStart:5}}>
        <Grid item xs={2.2}>
            <Paper>
                    {/* <div className={classes.leftBarStyle}>
                    <img src={`${serverURL}/images/${adminData.picture}`} width='70%'/>
                      <div className={classes.nameStyle}>{adminData.adminname}</div>   
                      <div  className={classes.emailStyle}>{adminData.emailid}</div>
                      <div  className={classes.phoneStyle}>+91{adminData.mob}</div>
                 </div> */}
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

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/dashboard/banners')}>
                                <ListItemIcon>
                               <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText>Banners</ListItemText>
                            </ListItemButton>
                        </ListItem> 

                        <ListItem disablePadding>
                            <ListItemButton onClick={()=>navigate('/dashboard/concern')}>
                                <ListItemIcon>
                               <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText>Concern</ListItemText>
                            </ListItemButton>
                        </ListItem> 

                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                               <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText>Sales report</ListItemText>
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

        </Grid>
        
        <Grid item xs={9.8} style={{padding:10}}>
       
      <Routes>
        <Route  element={<Categories/>} path={'/category'} />
        <Route  element={<DisplayAllCategory/>} path={'/displayallcategory'} />
        <Route  element={<Brands/>} path={'/brand'} />
        <Route  element={<DisplayAllBrand/>} path={'/displayallbrand'} />
        <Route  element={<SubCategory/>} path={'/subcategory'} />
        <Route  element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'} />
        <Route  element={<Products/>} path={'/products'} ></Route>
        <Route  element={<DisplayAllProducts/>} path={'/displayallproducts'} ></Route>
        <Route  element={<ProductDetails/>} path={'/productdetails'} ></Route>
        <Route element={<DisplayAllProductDetails />} path={'/displayproductdetails'}></Route>
        <Route element={<Banners/>} path={'/banners'}></Route>
        <Route element={<Concern/>} path={'/concern'}></Route>
        


        
        </Routes>
       
        </Grid>
       
      </Grid>
    </Box>
   
  );



}