import MaterialTable from "@material-table/core"
import { useStyles } from "./ProductDetailsCss"
import { useState,useEffect } from "react"
import { getData,postData,serverURL  } from "../../services/FetchNodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,TextField,Avatar} from "@mui/material";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


export default  function DisplayAllProductDetails(){

    const [productDetails,setProductDetails]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([]) 
    const [brandList,setBrandList]=useState([]) 
    const [productList,setProductList]=useState([]) 
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [productId,setProductId]=useState('')
    const [concern,setConcern]=useState('')
    const [error,setError]=useState({})
    const [product,setProduct]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('')
    const [type,setType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [quantity,setQuantity]=useState('')
    const [price,setPrice]=useState('')
    const [offerPrice,setOfferPrice]=useState('')
    const [offerType,setOfferType]=useState('')
    const [description,setDescription]=useState('')
    const [picture,setPicture]=useState({file:'logo.png',bytes:''})
    const [productDetailId,setProductDetailId]=useState('')
    const [open,setOpen]=useState(false)
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')    

    var classes=useStyles()
    var navigate=useNavigate()


    
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
const FetchAllProduct=async(bid)=>{
      var result=await postData("brand/Fetch_all_Product_by_Brand",{brandid:bid})
      setProductList(result.data)
    }
    
    const handleProductChange=(event)=>{
        setBrandId(event.target.value)
        FetchAllProduct(event.target.value)
    }
  
    const fillAllProduct=()=>{
      return productList.map((item)=>{
  
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
      })
    }
  
    useEffect(function(){
      FetchAllProduct()
    },[])

  
const handleError=(label,msg)=>{
  setError((prev)=>({...prev,[label]:msg}))
}
const handleWeightChange=(event)=>{
setWeightType(event.target.value)

}

const handleTypeChange=(event)=>{
setType(event.target.value)

}

const handlePackageChange=(event)=>{
setPackaging(event.target.value)

}


const handlePicture=(event)=>{
handleError('picture',null)
setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
setShowBtn(true)
}

    const DisplayAllProduct=async()=>{
        var result=await getData('productdetails/Display_All_Product')
       if(result.status)
       {setProductDetails(result.data)}
    }

    useEffect(function(){
        DisplayAllProduct()
    },[])

    const handleOpen=(rowData)=>{

      setOpen(true)
      
      setProductDetailId(rowData.productdetailid)
      FetchAllSubCategory(rowData.categoryid)
      setCategoryId(rowData.categoryid)
      setSubCategoryId(rowData.subcategoryid)

      FetchAllProduct(rowData.brandid)
      setBrandId(rowData.brandid)
      setProductId(rowData.productid)
      setProduct(rowData.productid)
      setConcern(rowData.concernname)
      setProduct(rowData.productsubname)
      setWeight(rowData.weight)
      setWeightType(rowData.weighttype)
      setType(rowData.type)
      setPackaging(rowData.packaging)
      setQuantity(rowData.qty)
      setPrice(rowData.price)
      setOfferPrice(rowData.offerprice)
      setOfferType(rowData.offertype)
      setDescription(rowData.description)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
      
    }


    const handleEdit=async()=>{
      var submit=true
  
   if(submit)
   { 
    var body={categoryid:categoryId,subcategoryid:subCategoryId,
              brandid:brandId,productid:productId,productsubname:product,
              weight:weight,weighttype:weightType,type:type,packaging:packaging,
              qty:quantity,price:price,offerprice:offerPrice,offertype:offerType,
              description:description,productdetailid:productDetailId}
    var result=await postData('productdetails/update_product_DetailData',body)  
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
   DisplayAllProduct()
  }
 }

    
const handlePictureEdit=async()=>{
  var formData=new FormData()
  formData.append('productdetailid',productDetailId)
  formData.append('picture',picture.bytes)
   var result=await postData('productdetails/edit_productdetail_picture',formData)
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
        
            DisplayAllProduct()
 }

 
const handleCancelPicture=()=>{
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)

}
    


    const handleClose=()=>{
      setOpen(false)
    }

    
const handleDelete=async(rowData)=>{
  
 
  
  Swal.fire({
    title: "Do you want to Dalete This Product Detail?",
    toast:true,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't Delete`
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var body={productdetailid:rowData.productdetailid}
      var result=await postData('productdetails/delete_productdetails_data',body)
      if(result.status)
      {Swal.fire("Deleted", "", "success");
      DisplayAllProduct() }
      else
      Swal.fire("Fail to delete record", "", "success");
     
    } else if (result.isDenied) {
      Swal.fire("Your record is safe", "", "info")
    }
  });

  }



    const ShowProductDetailsForm=()=>{
      return(
      <Dialog
      open={open}
      maxWidth={'md'}
      >
        <DialogContent>
        <div className={classes.box}>
      <Grid container spacing={3}>
          <Grid item xs={12} >
            <TitleComponent title="Product Details" logo="Medbazzar-logo.png" listicon="list.png"  />
         </Grid>
        <Grid item xs={3} >
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
        <Grid item xs={3}>
        <FormControl fullWidth>
                <InputLabel>Select Subcategory</InputLabel>
                <Select label='Select Subcategory'  value={subCategoryId} onFocus={()=>handleError('subCategoryId',null)} error={error.subCategoryId}  onChange={(e)=>setSubCategoryId(e.target.value)}>
              {fillAllSubCategory()}
                </Select>
              {error.subCategoryId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.subCategoryId}</span>:<></>}
              
            </FormControl>
        </Grid>
        <Grid item xs={3}>
        <FormControl fullWidth>
                <InputLabel> Select Brand</InputLabel>
                <Select label='Select Brand'
                 value={brandId}
                  onFocus={()=>handleError('brandId',null)} error={error.brandId}  
                  onChange={handleProductChange}>
              {fillAllBrand()}
                </Select>
                {error.brandId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.brandId}</span>:<></>}
            </FormControl>
        </Grid>
        <Grid item xs={3}> 
        <FormControl fullWidth>
            <InputLabel>Select Product</InputLabel>
             <Select label='Select Product'
                value={productId} 
                onFocus={()=>handleError('productId',null)} error={error.productId} 
                onChange={(e)=>setProductId(e.target.value)}>
                    {fillAllProduct()}
                </Select>
                {error.productId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.productId}</span>:<></>}

              </FormControl>
        </Grid>
        <Grid item xs={12} >
          <TextField fullWidth value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.product}</span>} onChange={(event)=>setProduct(event.target.value)} label="Product Subname">Product Subname</TextField>

        </Grid>
        <Grid item xs={12}>
                    <TextField value={concern} onChange={(event)=>setConcern(event.target.value)} label="Concern" fullWidth
                     onFocus={()=>handleError('concern',null)} error={error.concern}
                     helperText={<span style={{fontFamily:'Kanit', color:'#d32f2f', fontSize:13}}>{error.concern}</span>} />
                </Grid>
        <Grid item xs={6}>
          <TextField fullWidth  value={weight} onFocus={()=>handleError('weight',null)} error={error.weight} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}}>{error.weight}</span>} onChange={(event)=>setWeight(event.target.value)} label="Weight">Weight</TextField>

        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">WeightType</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={weightType}
                 label="WeightType"
                onChange={handleWeightChange}
                onFocus={()=>handleError('weightType',null)}
                error={error.weightType} 
              > <MenuItem value={'ml'}>ml</MenuItem>
              <MenuItem value={'gm'}>gm</MenuItem>
              <MenuItem value={'Kg'}>kg</MenuItem>
              <MenuItem value={'mg'}>mg</MenuItem>
              <MenuItem value={'liter'}>litter</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
   
  </Select>
  {error.weightType?<span style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}  > {error.weightType}</span>:<></>}

</FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                 label="Type"
                onChange={handleTypeChange}
                error={error.type} >
    <MenuItem value={'Capsule'}>Capsule</MenuItem>
    <MenuItem value={'Tablet'}>Tablet</MenuItem>
    <MenuItem value={'Drop'}>Drop</MenuItem>
    <MenuItem value={'Serup'}>Serup</MenuItem>
    <MenuItem value={'Bottle'}>Bottle</MenuItem>
    <MenuItem value={'Gel'}>Gel</MenuItem>
    <MenuItem value={'Cream'}>Cream</MenuItem>
    <MenuItem value={'Bar'}>Bar</MenuItem>
    <MenuItem value={'Lotion'}>Lotion</MenuItem>
    <MenuItem value={'Other'}>Other</MenuItem>
  </Select>
  {error.type?<span style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.type}</span>:<></>}

</FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">Package</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={packaging}
                 label="Package"
                onChange={handlePackageChange}
                error={error.packaging}>
    <MenuItem value={'Strip'}>Strip</MenuItem>
    <MenuItem value={'Box'}>Box</MenuItem>
    <MenuItem value={'Bottle'}>Bottle</MenuItem>
    <MenuItem value={'Single'}>Single Package Item</MenuItem>
   
      </Select>
      {error.packaging?<span style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.packaging}</span>:<></>}

      </FormControl>
      </Grid>
        <Grid item xs={6}>
           <TextField  value={quantity} onFocus={()=>handleError('quantity',null)} error={error.quantity} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.quantity}</span>} onChange={(event)=>setQuantity(event.target.value)} label="Quantity" fullWidth></TextField>
        </Grid>
        <Grid item xs={6}>
           <TextField  value={price} onFocus={()=>handleError('price',null)} error={error.price} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.price}</span>} onChange={(event)=>setPrice(event.target.value)} label="Price" fullWidth></TextField>
        </Grid>
        <Grid item xs={6}>
           <TextField  value={offerPrice} onFocus={()=>handleError('offerPrice',null)} error={error.offerPrice} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.offerPrice}</span>} onChange={(event)=>setOfferPrice(event.target.value)} label="Offer Price" fullWidth></TextField>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
           <InputLabel id="demo-simple-select-label">OfferType</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={offerType}
                label="offerType"
                 onChange={(event)=>setOfferType(event.target.value)}
                
             > <MenuItem value={'Weakend Sale'}>Weakend Sale</MenuItem>
             <MenuItem value={'Month Sale'}>Month Sale</MenuItem>
             <MenuItem value={'Festival Sale'}>Festival Sale</MenuItem>
           </Select>
      </FormControl>
        </Grid>
        <Grid item xs={12}>
           <TextField  value={description} onFocus={()=>handleError('description',null)} error={error.description} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.description}</span>} onChange={(event)=>setDescription(event.target.value)} label="Product description" fullWidth></TextField>
        </Grid>
                
        <Grid item xs={6} >
        {showBtn?<div style={{display:'flex',justifyContent:'space-evenly',height:50,alignItems:'center'}}><Button variant="contained" onClick={handlePictureEdit}>Save</Button><Button variant="contained" onClick={handleCancelPicture}>Cancel</Button></div>:<div>
                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                    Upload Picture
                    <input onClick={()=>handleError('picture',null) }  onChange={handlePicture} type='file' hidden  accept="images/*" multiple />
                </Button>
                </div>}
                {error.picture?<span style={{color:'red', color:"#d32f2f" ,marginLeft:12 ,fontSize:13}} >{error.picture}</span>:<></>}
                </Grid>
                <Grid item xs={6} style={{display:'flex' , justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file} style={{ display:'flex', height:70, width:70}} variant="rounded" />
                </Grid>
                            
              </Grid>

        </div>
        </DialogContent>
        <DialogActions>
        <Button  onClick={handleEdit} >Edit</Button>
        <Button  onClick={handleClose} >Close</Button>
        </DialogActions>
      </Dialog>

      )
    }

    function ShowProduct() {
        return (
          <MaterialTable
            title="Simple Action Preview"
            columns={[
              { title: 'ProductId', field: 'productdetailid' },
              { title: 'CategoryId', render:(rowData)=><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div> },
             
              { title: 'Brand/Product/Weight/Weight Type',  render:(rowData)=><div><div>{rowData.brandname}</div><div>{rowData.productname} </div><div>{rowData.weight} </div><div>{rowData.weighttype}</div></div>},
              
              { title: 'Product Subname/Concern Name',render:(rowData)=><div><div>{rowData.productsubname}</div><div>{rowData.concernname}</div></div>},
              
              
              { title: 'Type/Quantity',render:(rowData)=><div><div>{rowData.type}</div><div>{rowData.qty}</div></div> },
              { title: 'Packaging', field: 'packaging' },
              
              { title: 'Price',render:(rowData)=><div><div>&#8377;<s>{rowData.price}</s></div><div>&#8377;{rowData.offerprice}</div></div> },
             
              { title: 'Offet Type', field: 'offertype' }, 
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(',')[0]}`} style={{width:60,height:60,borderRadius:12}} ></img></> },
              
              
            ]}
            options={{
              paging:true,
              pageSize:4,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={productDetails}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Data',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Data',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Product',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/productdetails')
              }
             
            ]}
          />
        )
      }
return(<div className={classes.root}>
  <div className={classes.tablebox}>
    {ShowProduct()}
    </div>
    {ShowProductDetailsForm()}
</div>)

    }
