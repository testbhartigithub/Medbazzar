import MaterialTable from "@material-table/core"
import { useStyles } from "./ProductCss";
import { useState,useEffect } from "react";
import { postData,getData, serverURL } from "../../services/FetchNodeServices";


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,TextField,Avatar} from "@mui/material";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export default function DisplayAllProducts(){
    var navigate=useNavigate()
    var classes=useStyles()
    const [newProduct,setNewProduct]=useState([])
    const [open,setOpen]=useState(false)
    const [picture,setPicture]=useState({file:'product.jpg',bytes:''})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([]) 
    const [brandList,setBrandList]=useState([])  
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [product,setProduct]=useState('')
    const [productId,setProductId]=useState('')
    const [description,setDescription]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')
    
    
   


    const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
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

const fillAllBrand=(event)=>{
  return brandList.map((item)=>{

    return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
  })
}



    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setShowBtn(true)
    }

    
const handlePictureEdit=async()=>{
  var formData=new FormData()
  formData.append('productid',productId)
  formData.append('picture',picture.bytes)
   var result=await postData('product/edit_product_picture',formData)
   if(result.message)
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
        
   FetchAllProduct()
 }

 
const handleCancelPicture=()=>{
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)

}

const handleEditData=async()=>{
  var submit=true
  
   if(submit)
   { 
    var body={categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productname:product,description:description,productid:productId}
    var result=await postData('product/update_product_Data',body)  
   if(result.status)
   {
    Swal.fire({
      icon: "Succes",
      title: result.message, 
      timer: 1500           
    });  
   }
   else
   {
    Swal.fire({
        icon: "Error",
        title: result.message,    
        timer: 1500        
      });   
   }
   FetchAllProduct()
  }
 }
   
 
const handleDelete=async(rowData)=>{
  
 
  
  Swal.fire({
    title: "Do you want to Dalete This Subcategory?",
    toast:true,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't Delete`
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var body={productid:rowData.productid}
      var result=await postData('product/delete_product',body)
      if(result.status)
      {Swal.fire("Deleted", "", "success");
      FetchAllProduct() }
      else
      Swal.fire("Fail to delete record", "", "success");
     
    } else if (result.isDenied) {
      Swal.fire("Your record is safe", "", "info");
    }
  });

  }



    const FetchAllProduct=async()=>{
        var result= await getData('product/Display_All_Product')
        if(result.status)
        { setNewProduct(result.data)}
    }

   useEffect(function(){
    FetchAllProduct()
  },[])

  const handleClose=()=>{
    setOpen(false)
  }

  const handleOpen=(rowData)=>{

    setOpen(true)
    setProductId(rowData.productid)
    FetchAllSubCategory(rowData.categoryid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setProduct(rowData.productname)
    setDescription(rowData.description)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.picture}`)

  }
  const ShowProductForm=()=>{
    return(
    <Dialog
     open={open}
     onClose={handleClose}
     maxWidth={'md'}
                      >
      <DialogContent>
      <div className={classes.box}>
        <Grid container spacing={3}>
        <Grid item xs={12}>
                <TitleComponent title='Add Product' logo='Medbazzar-logo.png'  listicon="list.png" />
                </Grid>
            <Grid item xs={12} >
            <FormControl fullWidth>
                <InputLabel> Select Category</InputLabel>
                <Select label=' Select category' value={categoryId} onFocus={()=>handleError('product',null)} error={error.product} onChange={handleSubcategoryChange}>
                  {fillAllCategory()}
        
                </Select>
                {error.categoryId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.categoryId}</span>:<></>}
            </FormControl>
            </Grid>
            <Grid item xs={12} >
            <FormControl fullWidth>
                <InputLabel>Select Subcategory</InputLabel>
                <Select label='Select Subcategory'  value={subCategoryId} onFocus={()=>handleError('product',null)} error={error.product}  onChange={(e)=>setSubCategoryId(e.target.value)}>
              {fillAllSubCategory()}
                </Select>
                {error.subCategoryId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.subCategoryId}</span>:<></>}

            </FormControl>
            </Grid>
            <Grid item xs={12} >
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
            <Grid item xs={6} >
              {showBtn?<div style={{display:'flex',justifyContent:'space-evenly',height:50,alignItems:'center'}}><Button variant="contained" onClick={handlePictureEdit}>Save</Button><Button variant="contained" onClick={handleCancelPicture}>Cancel</Button></div>:<div>
              <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth >
                Set New Picture
                <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple />
               </Button>
               </div>}
              
          </Grid> 
            <Grid item xs={6} style={{display:'flex', justifyContent:'center'}}>
                <Avatar  alt="Remy Sharp" src={picture.file} style={{ display:'flex', height:90, width:90}}  variant="rounded" />
            </Grid>
           </Grid>
        </div>
 
        
      </DialogContent>
      <DialogActions>
      <Button onClick={handleEditData}>Edit</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    )

  }

  
    function ShowProductData() {
        return (
          <MaterialTable
            title="Simple Action Preview"
            columns={[
              { title: 'Category', field: 'categoryname' },
              { title: 'Sub category', field: 'subcategoryname' },
              { title: 'Brand', field: 'brandname' },
              { title: 'Product', field: 'productname' },
              { title: 'Description', field: 'description' },
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:12}}></img></> },
              
            ]}
            options={{
              paging:true,
              pageSize:4,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={newProduct}        
            actions={[

              {
                icon: 'edit',
                tooltip: 'Add Product',
                onClick: (event, rowData) =>handleOpen(rowData)
              },  {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/products')
              }
            ]}
          />
        )
      }

      return(<div className={classes.root}>
        <div className={classes.table}>
            {ShowProductData()}
        </div>
        {ShowProductForm()}
      </div>)
   




}