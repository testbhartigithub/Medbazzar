import { useState,useEffect } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useStyles } from "./ProductCss";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postData, getData,serverURL } from "../../services/FetchNodeServices";
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import Swal from "sweetalert2";




export default function Products(){
    
    var classes=useStyles()
    const [picture,setPicture]=useState({file:'product.jpg',bytes:''})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([]) 
    const [brandList,setBrandList]=useState([])  
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [product,setProduct]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})

    const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
    }

    const handleSubmit=async()=>{
      var submit=true
      if(categoryId.length==0)
       {
        submit=false
        handleError('categoryId','Pls Select category ..')
        
       }
       if(subCategoryId.length==0)
       {
        submit=false
        handleError('subCategoryId','Pls Input Subcategory...')
        
       }
      
       if(brandId.length==0)
       {
        submit=false
        handleError('brandId','Pls Input Brand ..')
        
       }
      
       if(product.length==0)
       {
        submit=false
        handleError('product','Pls Input Product Name...')
        
       }
       if(description.length==0)
       {
        submit=false
        handleError('description','Pls Input Description Name...')
        
       }
       
       if(picture.bytes.length==0)
       {submit=false
        handleError('picture','Pls select Picture... ')
       }
       if(submit)
       { 
        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('brandid',brandId)
        formData.append('productname',product)
        formData.append('description',description)
        formData.append('picture',picture.bytes)
       var result=await postData('product/submit_Product',formData)
       console.log(error)
       if(result.status)
       {
        Swal.fire({
          icon: "Succes",
          title: result.message, 
          timer: 1500,
          toast:true           
        });  
       }
       else
       {
        Swal.fire({
            icon: "Error",
            title: result.message,    
            timer: 1500, 
            toast:true       
          });   
       }
      
      }
     }
    

    
  const FetchAllCategory=async()=>{
    var result=await getData ("category/Display_All_Category")
    if(result.status)
    {
      setCategoryList(result.data)
    }

  }

  useEffect(function(){
    FetchAllCategory()
  },[])

  const fillAllCategory=()=>{
    return categoryList.map((item)=>{
       
        return  <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })
  }

  const FetchAllSubCategory=async(cid)=>{
    var result=await postData("category/Fetch_all_subcategory_by_category",{categoryid:cid})
    setSubCategoryList(result.data)
  }
  
  const handleSubcategoryChange=(event)=>{
      setCategoryId(event.target.value)
      FetchAllSubCategory(event.target.value)
  }

  const fillAllSubCategory=()=>{
    return subCategoryList.map((item)=>{

      return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    })
  }

  useEffect(function(){
    FetchAllSubCategory()
  },[])

  const FetchAllBrand=async()=>{
    var result=await getData('brand/Display_All_Brand')
    if(result.status)
    {
      setBrandList(result.data)}
    }
useEffect(function(){

FetchAllBrand()
},[])

const fillAllBrand=()=>{
  return brandList.map((item)=>{

    return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
  })
}



    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
    }

    const handleReset=()=>{
      setCategoryId('')
      setSubCategoryId('')
      setBrandId('')
      setProduct('')
      setDescription('')
      setPicture({file:'product.jpg',bytes:''})
    }
    
    return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={3} >
        <Grid item xs={12}>
                <TitleComponent title='Add Product' logo='Medbazzar-logo.png'  listicon="list.png" page='/dashboard/displayallproducts'/>
                </Grid>
            <Grid item xs={4} >
            <FormControl fullWidth>
                <InputLabel> Select Category</InputLabel>
                <Select  label=' Select category' 
                value={categoryId}
                onFocus={()=>handleError('categoryId',null)} 
                error={error.categoryId} 
                onChange={handleSubcategoryChange}>
                  {fillAllCategory()}
                </Select>
                {error.categoryId?<span style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.categoryId}</span>:<></>}
</FormControl>
            </Grid>
            <Grid item xs={4} >
            <FormControl fullWidth>
                <InputLabel>Select Subcategory</InputLabel>
                <Select label='Select Subcategory'  value={subCategoryId} onFocus={()=>handleError('product',null)} error={error.product}  onChange={(e)=>setSubCategoryId(e.target.value)}>
              {fillAllSubCategory()}
                </Select>
              {error.subCategoryId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.subCategoryId}</span>:<></>}
              
            </FormControl>
            </Grid>
            <Grid item xs={4} >
            <FormControl fullWidth>
                <InputLabel> Select Brand</InputLabel>
                <Select label='Select Brand' value={brandId} onFocus={()=>handleError('product',null)} error={error.product}  onChange={(e)=>setBrandId(e.target.value)}>
              {fillAllBrand()}
                </Select>
                {error.brandId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.brandId}</span>:<></>}
            </FormControl>
            </Grid>
            <Grid item xs={12} >
              <TextField value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span  style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.product}</span>} onChange={(event)=>setProduct(event.target.value)} label='Input Productname' fullWidth></TextField>
            </Grid>
            <Grid item xs={12} >
            <TextField value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span  style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} label='Description' fullWidth></TextField>
            </Grid>
            <Grid item xs={6} style={{display:'flex', alignItems:'center'}}>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth >
                 Upload Picture
                <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
               </Button>
               {error.picture?<span style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}  > {error.picture}</span>:<></>}
          </Grid> 
            <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                <Avatar  alt="Remy Sharp" src={picture.file} style={{ display:'flex', height:90, width:90}}  variant="rounded" />
            </Grid>
            <Grid item xs={6}>
            <Button  onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>Reset</Button>
            </Grid>

        </Grid>
        </div>
    </div>)
}