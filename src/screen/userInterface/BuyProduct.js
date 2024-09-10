import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import ShowCart from "../../component/userinterface/ShowCart"
import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductPicture from "../../component/userinterface/ProductPicture";
import ProductInformation from "../../component/userinterface/ProductInformation";
import OrderSummary from "../../component/userinterface/OrderSummary";
import PriceDetails from "../../component/userinterface/PriceDetails";
import DeliveryAddress from "../../component/userinterface/DeliveryAddress"


export default function BuyProduct(){

    
  var location = useLocation();
  var item = location?.state?.data;
    // alert(JSON.stringify(item))


 

    return(<div style={{display:'flex',width:'100%',height:'100vh',background:'green'}}>
      <Grid container spacing={2}>
      
      <Grid item xs={8}>
        <div style={{display:'flex',width:'100%',marginTop:'3%'}}>
        <DeliveryAddress />
        </div>
        </Grid>

       
        <Grid item xs={8}>
        <div style={{display:'flex',marginTop:'10%'}}>
        <OrderSummary item={item} />
        </div>
        </Grid>
        
        <Grid item xs={4}>
        <div style={{display:'flex',marginTop:'10%'}}>
        < PriceDetails  item={item}/> 
        </div>
        </Grid>
        
      </Grid>
    </div>)
}