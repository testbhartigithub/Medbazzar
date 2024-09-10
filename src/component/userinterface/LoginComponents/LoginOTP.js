import React, { useState } from "react";
import { Button,Grid,TextField } from "@mui/material";
import PhoneIcon from '@mui/icons-material/PhonelinkRingOutlined';
import { postData } from "../../../services/FetchNodeServices";
import GetOTP from "./GetOTP";
import {useDispatch} from 'react-redux'
import SignUp from "./SignUp";

export default function LoginOTP(){

    const [otp, setOtp]=useState(0)
    const [status, setStatus]=useState(true)
    const [mobileno,setMobileno]=useState('')
    const [userStatus,setUserStatus]=useState(false)
    const [userData, setUserData]=useState([])
    var dispatch=useDispatch()

    const generateOTP=()=>{
      var myotp=parseInt(Math.random()*8999)+1000
      alert(myotp)
      setOtp(myotp)
    }

    const handleOTP=async()=>{
      var result=await postData('users/check_userdata',{mobileno:mobileno})
      if(result.status==false)
      { generateOTP()
        setStatus(!status)
        setUserStatus(false)
      }
      else
      {generateOTP()
        setStatus(!status)
       setUserStatus(true)
       setUserData(result.data)
       
      }
    }



return(<div style={{display:'flex',width:'100%',height:'100vh',justifyContent:'center',alignItems:'center'}}>
   {status? <div style={{display:'flex',width:'77%',height:'auto',boxShadow:'5px 5px 10px #555'}}>
   
    <Grid container spacing={2} >
        <Grid item xs={12}>
        <h2 style={{display:'flex',justifyContent:'center',fontFamily:'kanit',fontSize:25}}>Sign in to MedBazzar</h2>
        </Grid>
       <Grid item xs={12}>
           <div style={{display:'flex',justifyContent:'center'}}>
           <PhoneIcon sx={{ color: 'grey', mr: 1, my: 0.5 }} />

           <TextField

              type="number"
              label="Mobile Number"
              variant='outlined'
              color='grey'
              PaddingLeft="normal"
              onChange={(e)=>setMobileno(e.target.value)}
              InputProps={{
              startAdornment: "+91",
              }}
            />
           </div>
          </Grid> 

          <Grid item xs={12} style={{display:'flex',justifyContent:'center',marginBottom:7}}> 
          <Button  variant="contained" color="success" onClick={handleOTP}>
            Get OTP
            </Button>
 
            </Grid> 
            <Grid item xs={12}>
            <p style={{ fontSize: 14, margin: 30 }}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>  
          </Grid>
        </div>:userStatus?<GetOTP  mobileno={mobileno} otp={otp} userData={userData} />:<SignUp  mobileno={mobileno} otp={otp}/>}
   </div>
)
}