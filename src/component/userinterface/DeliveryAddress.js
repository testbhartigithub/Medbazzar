import { Button, Grid ,Paper} from "@mui/material";

import { useState,useEffect } from "react";
import { postData } from "../../services/FetchNodeServices";
import { useSelector } from "react-redux";

export default function  DeliveryAddress(props){

  const [caption, setCaption]=useState('+Add Address')
  const [status, setStatus] = useState(false)
  const [pageRefresh,setPageRefresh]=useState(false)
  const [userAddress,setUserAddress]=useState([])
  const [caption2, setCaption2]=useState('Please add delivery address..')



  
 
  const showAllAddress=(userAddress)=>{
    return userAddress?.map((item)=>{
      return <div style={{display:'flex',width:'100%',height:'auto',flexDirection:'column'}}>
        <div>{item?.address}</div>
        <div>{item?.landmark} , {item?.pincode}</div>
        <div>{item?.state} ,{item?.city}</div>
         
      </div>
    })

  }


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
         setCaption("Edit Data")
         setCaption2('')
        
     }
 }
}

  useEffect(function(){
    check_user_Addres()
   
},[userData?.mobileno,pageRefresh])
 

    return(
       <div>
         <Paper elevation={1} style={{display:'flex',width:'100%',justifyContent:'center',fontFamily:'kanit'}}>
            <Grid container spacing={1} style={{margin:10}} >
                <Grid item xs={12} style={{fontWeight:'bold',fontSize:22}}>
               {caption2}
                </Grid>
           
            <Grid item xs={12} style={{display:'flex',alignItems:'center',marginBottom:5}}>
            <Grid item xs={8}>
            { props?.userAddress?.length==0?<div>{caption}</div>:<div>
           <div> {props?.userData?.username}</div>
            {showAllAddress(props?.userAddress)}
         

          </div>}
            <Grid >
           
          
            </Grid>
            </Grid>
            
           
            <Grid item xs={4} >
            <Button variant="contained" size="medium" style={{textDecoration:'lower'}}>
            {caption}
          </Button>
            </Grid>
            </Grid>
            </Grid>
        </Paper>

       </div>
    )
}