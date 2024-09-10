import ShowCart from "./ShowCart";
import PaymentDetails from "./PaymentDetail";
import {Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {useSelector} from  'react-redux';
import { useEffect, useState } from "react";
import { postData } from "../../services/FetchNodeServices";
import AddAddress from "./AddAddress";
import DeliveryAddress from "./DeliveryAddress";
import EditAddress from "./EditAddress";
export default function Cart(){

    var theme=useTheme()
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const [userAddress,setUserAddress]=useState([])
    const [pageRefresh, setPageRefresh]=useState(false)

     var productFromRedux=useSelector(state=>state.data)
    var products=Object.values(productFromRedux)
    const [status, setStatus] = useState(false)

    var userData=Object.values(useSelector(state=>state.user))[0]
   
    const check_user_Addres=async()=>{

        if(userData?.mobileno==undefined)
        { setStatus(false)}
        
        else{
         var result=await postData('users/check_user_address',{mobileno:userData?.mobileno})
         if(result.status==false)
         {
             setStatus(true) 
            
         }
         else
         {
             setStatus(false)
             setUserAddress(result.data)
            
         }
     }
    }
      useEffect(function(){
        check_user_Addres()
    },[userData?.mobileno,pageRefresh])


      
return(<div>
   <div>
    <Grid container spacing={2}>
    <Grid item xs={md?12:7} >
    {userData?.mobileno!=undefined?
    <Grid item xs={md?12:7} style={{display:'flex',width:'100%',marginLeft:30,marginTop:10}}>
        <DeliveryAddress userData={userData} userAddress={userAddress} pageRefresh={pageRefresh} state={status}  setStatus={setStatus} setPageRefresh={setPageRefresh}/>
    </Grid>:<div></div>}
    <ShowCart  products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
    </Grid>
  
    <Grid xs={md?12:5} style={{marginTop:40}}>
    <PaymentDetails userData={userData} products={products} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userAddress={userAddress} />
    </Grid>
    </Grid></div>

    <AddAddress pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} userAddress={userAddress} userData={userData} status={status} setStatus={setStatus} />

</div>)

}