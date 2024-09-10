import { useState } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useStyles } from "./BrandsCss";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Brands(){
    var classes=useStyles()
    var navigate=useNavigate()
    const [picture,setPicture]=useState({file:'brand.png',bytes:''})
    const [brand,setBrand]=useState('')
    const [error,setError]=useState({})
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg})) 
    }
    
    const handleSubmit=async()=>{
        var submit=true
       if(brand.length==0)
       {
        submit=false
        handleError('brand','Pls Input Brand Name...')
        
       }
       if(picture.bytes.length==0)
       {submit=false
        handleError('picture','Pls select icon image... ')
       }
       if(submit)
       { 
        var formData=new FormData()
        formData.append('brandname',brand)
        formData.append('picture',picture.bytes)
       var result=await postData('brand/submit_Brand',formData)
       console.log(error)
       if(result.status)
       {
        Swal.fire({
            icon: "Succes",
            title: result.msg, 
            timer: 1500           
          });  
       }

       else
       {
        Swal.fire({
            icon: "Error",
            title: result.msg,    
            timer: 1500        
          });   
       }
       }
      }
      const handleReset=()=>{
     setBrand('')
     setPicture({file:'brand.png',bytes:''})

      }


    return(
        <div className={classes.root} >
            <div className={classes.box}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TitleComponent title="Add Brands" logo="Medbazzar-logo.png" listicon="list.png" page='/dashboard/displayallbrand' />
                  </Grid>
                <Grid item xs={12}>
                    <TextField value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span  style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth ></TextField>
                    </Grid> 
                <Grid item xs={6}>
                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                    Upload file
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type='file' hidden  accept="images/*" multiple />
                </Button>
                 {error.picture?<span style={{color:'#d32f2f',fontSize:14, paddingLeft:12}}>{error.picture}</span>:<></>}
                    </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center' }}>
                    <Avatar  alt="Remy Sharp" src={picture.file}  variant="rounded" />
                    </Grid>        

                <Grid item xs={6} style={{display:'flex',justifyContent:'center' }}>
                    <Button  onClick={handleSubmit} variant="contained" fullWidth >Submit</Button>
                    </Grid> 
                <Grid item xs={6}>
                    <Button onClick={handleReset} variant="contained" fullWidth >Reset</Button>
                    </Grid>    

            </Grid>
            </div>

        </div>
    )

}