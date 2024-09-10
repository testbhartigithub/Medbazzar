import { useState,useEffect } from "react";
import { Button,Grid,Avatar, makeStyles } from "@mui/material";
import { useStyles } from "./BannerCss";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getData, postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import Cross from '@mui/icons-material/Clear';



export default function Banners(){

    const [picture,setPicture]=useState({file:[],bytes:''})
    const [error,setError]=useState({})
    const [bannerType,setBannerType]=useState('')
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])

    const handlePicture=(event)=>{
        if(Object.values(event.target.files).length>=3 & Object.values(event.target.files).length<=6)

        { console.log(event.target.files)
          setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }
        else
        {alert('Pls upload 3 or more picture')}
      }
          


    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg})) 
    }
    
    const handleSubmit=async()=>{ 
        var submit=true
        if(bannerType.length==0)
       {
        submit=false
        handleError('bannerType','Pls Select Banner Type ..')
        
       }
       if(brandId.length==0)
       {
        submit=false
        handleError('brandId','Pls Select Brand...')
        
       }
      
       
       if(submit)
       { 
        var formData=new FormData()
        formData.append('bannertype',bannerType)
        formData.append('brandid',brandId)
        picture.file.map((item,i)=>{
            formData.append('picture'+i,item)
        })
        var result=await postData('banner/submit_Banner',formData)
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
     setBannerType('')
     setBannerType('')
     setPicture({file:[]})

      }

     
 const fetchAllBrand = async () => {
    var result = await getData('brand/display_all_brand')
    if (result.status) {
        setBrandList(result.data)

    }
}
useEffect(function () { fetchAllBrand() }, [])
const fillAllBrand = () => {
    return brandList.map((item) => {

        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })

}

 
const showImage=()=>{
    return picture?.file?.map((item, i)=>{
  
      
      return(<div style={{display:"flex",flexDirection:'row'}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} style={{ display:'flex',height:50, width:50,borderRadius:12 ,margin:1}} variant="rounded" /><Cross style={{cursor:"pointer",}} />
      </div>)
    })
  }
  


    var classes=useStyles()

    return(
        <div className={classes.root} >
            <div className={classes.box}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TitleComponent title="Banners List" logo="Medbazzar-logo.png" listicon="list.png" />
                  </Grid>
                <Grid item xs={12}>
                <FormControl size="small" fullWidth>
               <InputLabel id="demo-simple-select-label">Banner Type</InputLabel>
                    <Select
                   labelId="demo-simple-select-label"
                       id="demo-simple-select"
                       value={bannerType}
                      label="Banner Type"
                      onFocus={()=>handleError('bannerType',null)} 
                      error={error.bannerType}
                      onChange={(event) => setBannerType(event.target.value)}
                      >
                    <MenuItem value={'General'}>General</MenuItem>
                    <MenuItem value={'Brand'}>Brand</MenuItem>
                     <MenuItem value={'Tranding'}>Tranding</MenuItem>
                     <MenuItem value={'Tranding'}>Latest</MenuItem>
                     <MenuItem value={'Tranding'}>Popular</MenuItem>
                 </Select>
                 {error.bannerType?<span style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}} >{error.bannerType}</span>:<></>}
                </FormControl>
                    </Grid> 
                    <Grid item xs={12}>
            
            <FormControl size="small" fullWidth>
             <InputLabel >Brand</InputLabel>
              <Select
                
                 label='Brand'
                 value={brandId}
                onFocus={()=>handleError('brandId',null)}
                 error={error.brandId}
                  onChange={(e)=>setBrandId(e.target.value)}
               >
                {bannerType === 'Brand' ? (fillAllBrand()): (<MenuItem value={0}>None</MenuItem>  )}              
                        </Select>
              {error.brandId?<span style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.brandId}</span>:<></>}

             </FormControl>            
         </Grid>
                <Grid item xs={6}>
                <Button  component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                    Upload file
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type='file' hidden  accept="images/*" multiple />
                </Button>
                 {error.picture?<span style={{color:'#d32f2f',fontSize:14, paddingLeft:12}}>{error.picture}</span>:<></>}
                    </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',flexWrap:'wrap' }}>
                    {showImage()}
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