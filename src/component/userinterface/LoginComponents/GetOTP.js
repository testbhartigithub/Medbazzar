import { Button, Grid,Paper } from "@mui/material";
import { useState } from "react";
import React from "react";
import OtpInput from "react-otp-input";
import LoginOTP from "./LoginOTP";
import {useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function GetOTP(props) {
  const [otp, setOtp] = useState("");
  const [status,setStatus]=useState(true)
  
  var dispatch=useDispatch()
  var navigate=useNavigate()

  const handleVerifyOtp=()=>{
   if(otp==props.otp)
   {
    dispatch({type:'ADD_USER',payload:[props?.mobileno,props?.userData]})
    navigate("/cart")
   }
   else
   {
    alert("Invalid otp.....")
   }

  }
  return (
    <div style={{ width:'100%',height:'auto',display:'flex',justifyContent:'center',alignItems:'center' }} >
        {status?
    <Paper elevation={3} style={{ display:'flex',width: "85%",height:'70%',}}>
      <Grid
        container
        spacing={1}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",         
          fontFamily: "kanit",
        }}
      >
        <Grid item xs={12}>
          <Grid item xs={12} style={{display: "flex",justifyContent: "center",alignItems: "center",flexDirection: "column",}}fullWidth >
            <div style={{ fontWeight: "bold", fontSize: 20,marginTop:15}}>
              Verify Phone Number
            </div>
            <div style={{ fontWeight: "", fontSize: 13 }}>
              An SMS with 4-digit OTP was sent to
            </div>
          </Grid>

          <Grid item xs={12}  style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center',marginTop:10}}  >
                    
                    <div style={{fontWeight:'bold',fontSize:15,margin:1}} >+91-{props.mobileno}</div>
                    <Button onClick={()=>setStatus(!status)} size="small" variant="text" > change</Button>

            </Grid>

          <Grid item xs={12} style={{display: "flex",justifyContent: "center",alignItems: "center",}}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderSeparator={<span>-</span>}
              renderInput={(props) => <input {...props} />}
              inputStyle={{ width: 35, height: 40 }}
            /> 
          </Grid>

          <Grid item xs={12} style={{display:"flex",justifyContent:"center",alignItems:"center",margin: 30, }}>
            <Button size="small" onClick={handleVerifyOtp} variant="contained" >
              Verify
            </Button>
          </Grid>

          <Grid item xs={12} style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: 20,}}>
            <p style={{ fontSize: 14,margin:10}}>
              By Continuing, you agree to our{" "}
              <span style={{ color: "blue" }}>Terms Of Service</span> and{" "}
              <span style={{ color: "blue" }}>Privacy & Legal Policy</span>{" "}
            </p>
          </Grid>
        </Grid>
      </Grid>
    </Paper>:<LoginOTP />}
    </div>
  );
}
