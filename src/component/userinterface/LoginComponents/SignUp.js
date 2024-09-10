import { Dialog, DialogContent, DialogTitle ,Button,Box,Grid,TextField} from "@mui/material";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/PersonOutlineOutlined';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import PhoneIcon from '@mui/icons-material/PhonelinkRingOutlined';
import {Paper,Divider} from "@mui/material"
import { postData } from "../../../services/FetchNodeServices";

import Swal from "sweetalert2"
import OtpInput from "react-otp-input"
import {useNavigate} from "react-router-dom";
import LoginOTP from "./LoginOTP";
import {useDispatch} from 'react-redux'


export default function SignUp(props){
    
const [otp,setOtp]=useState('')
const [userName,setUserName]=useState('')
const [emailId,setEmail]=useState('')
const [mobile,setMobile]=useState('')
const [status,setStatus]=useState(true)

var dispatch=useDispatch()
var navigate=useNavigate()

const handleSubmit=async()=>{
 if(props.otp==otp)
     {  var body={mobileno:props.mobileno,emailid:emailId,username:userName}
        var result= await postData('users/submit_user',body)
        if(result.status)
        {
            Swal.fire({
                position: "bottom-end",
                background:'green',
                fontFamily:'kanit',
                color:'black',
                icon: "success",
                title: "You are registered now...",
                showConfirmButton: false,
                timer: 1500,
                toast:true
              });
              dispatch({type:'ADD_USER',payload:[props.mobileno,body]}) 
              navigate('/cart')
        }
     }
     else
     {
        alert("Invalid OTP...")
     }

    }

   


return(<div style={{display:'flex',width:'100%',justifyContent:'center'}}>

      {status?
        <Paper elevation={3} style={{display:'flex',width:'88%',height:'80vh',justifyContent:'center'}} >
             
              <Grid container spacing={0} style={{display:'flex',width:'60%',justifyContent:'center',alignItems:'center'}} >
        <Grid item xs={12} style={{display:'flex',justifyContent:'center',fontSize:30,fontWeight:'bold',fontFamily:'kanit'}}>
           
            Sign In
           
        </Grid>
       <Divider />
                <Grid item xs={12} >
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField  label="Your Name" variant="standard" value={userName}  onChange={(e)=>setUserName(e.target.value)} ></TextField>
      </Box>
                </Grid>

             <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                 <TextField  label="Email Address" variant="standard" value={emailId}  onChange={(e)=>setEmail(e.target.value)}></TextField>
             </Box>
                </Grid>    

            <Grid item xs={12}>
             <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                 <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                 <TextField  label="Phone Number" variant="standard" value={mobile}  onChange={(e)=>setMobile(e.target.value)}></TextField>
                </Box>
                </Grid>
                <Grid item xs={12} style={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column",}}>
            <div style={{ fontWeight: "bold", fontSize: 15}}>
              Verify Phone Number
            </div>
            <div style={{ fontWeight: "", fontSize: 13 }}>
              An SMS with 4-digit OTP was sent to
            </div>
          </Grid>

          <Grid item xs={12} fullWidth style={{display:'flex',justifyContent:'center',alignItems:'center'}}  >
                    
                    <div style={{fontWeight:'bold',fontSize:15}} >+91{props.mobileno}</div>
                    <Button onClick={()=>setStatus(!status)} size="small" variant="text" >change</Button>

            </Grid>

          <Grid item xs={12} style={{display: "flex",justifyContent: "center",alignItems: "center",}}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: 25, height: 25 }}
            /> 
          </Grid>

          <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop: 5, color:'green' }}>
            <Button size="small"  onClick={handleSubmit} variant="contained" style={{background:'green'}}>
              Register
            </Button>
          </Grid>

          <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 5,}}>
            <p style={{ fontSize: 14}}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>
        
        </Grid>
        
    </Paper>:<LoginOTP />}
    
</div>)

}