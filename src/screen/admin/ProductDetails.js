import { useStyles } from "./ProductDetailsCss";
import { useState ,useEffect} from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { postData,getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import Cross from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useMemo } from "react";



 export default function ProductDetails(){

    const [zoom, setZoom]=useState("")
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([]) 
    const [brandList,setBrandList]=useState([]) 
    const [productList,setProductList]=useState([]) 
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [brandId,setBrandId]=useState('')
    const [productId,setProductId]=useState('')
    const [concernList,setConcernList]=useState([])
    const [concernId,setConcernId]=useState('')
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
    const [picture,setPicture]=useState({file:[],bytes:""})
    const [img,setImg]=useState('')


    const modules = useMemo(() => ({
      toolbar: {
        container: [
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          ['bold', 'italic', 'underline', "strike"],
          [{ 'list': 'ordered' }, { 'list': 'bullet' },
          { 'indent': '-1' }, { 'indent': '+1' }],
          ['image', "link",],
          [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
        ],
       
      },
    }), [])
    

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


    const FetchAllConcern=async()=>{
      var result=await getData('concern/Display_All_Concern')
      if(result.status)
      {
        setConcernList(result.data)}
      }
  useEffect(function(){
  
  FetchAllConcern()
  },[])
  
  const fillAllConcern=()=>{
    return concernList.map((item)=>{
  
      return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
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

const handlePicture=async(event)=>{
  handleError('picture',null)
 // alert(JSON.stringify(event.target.files))

  // var file=await Object.values(event.target.files).map((item)=>{
  //   return URL.createObjectURL(item)
  // })

  if(Object.values(event.target.files).length>=3 & Object.values(event.target.files).length<=6)

  { console.log(event.target.files)
    setPicture({file:Object.values(event.target.files),bytes:event.target.files})
  }
  else
  {alert('Pls upload 3 or more picture')}
}

const showImage=()=>{
  return picture?.file?.map((item, i)=>{

    
    return(<div style={{display:"flex",flexWrap:'wrap',flexDirection:'row'}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} style={{ display:'flex', height:70, width:70 }} variant="rounded" /><div>{i}<Cross style={{cursor:"pointer",}} /></div> 
    </div>)
  })
}


const handleReset=()=>{
  setCategoryId('')
  setSubCategoryId('')
  setBrandId('')
  setProductId('')
  setProduct('')
  setConcernId('')
  setWeight('')
  setWeightType('')
  setType('')
  setPackaging('')
  setQuantity('')
  setPrice('')
  setOfferPrice('')
  setOfferType('')
  setDescription('')
  setPicture({file:[],bytes:''})
}

const handleSubmit=async()=>{
  var submit=true
  if(categoryId.length==0)
  {submit=false
   handleError('categoryId','Pls select Category .. ')
  }
  if(subCategoryId.length==0)
       {
        submit=false
        handleError('subCategoryId','Pls select Subcategory...')
        
       }
      
       if(brandId.length==0)
       {
        submit=false
        handleError('brandId','Pls select Brand ..')
        
       }
      
       if(productId.length==0)
       {
        submit=false
        handleError('productId','Pls select Product..') 
       }
       if(product.length==0)
       {
        submit=false
        handleError('product','Pls Input Product Name...')
        
       }
       if(concernId.length==0)
       {
        submit=false
        handleError('concernId','Pls select Concern Type ..')
        
       }
      
       if(weight.length==0)
       {
        submit=false
        handleError('weight','Pls input Weight...')
        
       }
       if(weightType.length==0)
       {
        submit=false
        handleError('weightType','Pls Select WeightType..')
        
       }
        if(type.length==0)
        {
          submit=false
         handleError('type','Pls select Type...')
        
         }
         if(packaging.length==0)
         {
          submit=false
          handleError('packaging','Pls select Packaging...')
        
        }
       if(quantity.length==0)
       {
        submit=false
        handleError('quantity','Pls Input Quantity...')
        
       }
       if(price.length==0)
       {
        submit=false
        handleError('price','Pls Input Price...')
        
       }
       if(offerPrice.length==0)
       {
        submit=false
        handleError('offerPrice','Pls Input OfferPrice...')
        
       }
        if(description.length==0)
        {
         submit=false
         handleError('description','Pls Input Description...')
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
   formData.append('productid',productId)
   formData.append('concernid',concernId)
   formData.append('productsubname',product)
   formData.append('weight',weight)
   formData.append('weighttype',weightType)
   formData.append('type',type)
   formData.append('packaging',packaging)
   formData.append('qty',quantity)
   formData.append('price',price)
   formData.append('offerprice',offerPrice)
   formData.append('offertype',offerType)
   formData.append('description',description)
   picture.file.map((item,i)=>{
    formData.append('picture'+i,item)

   })

  var result=await postData('productdetails/submit_Productdetails',formData)
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

    var classes=useStyles()
    return(<div className={classes.root}>
     <div className={classes.box}>
      <Grid container spacing={3}>
          <Grid item xs={12} >
            <TitleComponent title="Product Details" logo="Medbazzar-logo.png" listicon="list.png" page='/dashboard/displayproductdetails' />
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
                {error.categoryId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.categoryId}</span>:<></>}
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
                {error.brandId?<span style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.brandId}</span>:<></>}
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
        <Grid item xs={6} >
          <TextField fullWidth value={product} onFocus={()=>handleError('product',null)} error={error.product} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.product}</span>} onChange={(event)=>setProduct(event.target.value)} label="Product Subname">Product Subname</TextField>

        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
            <InputLabel>Select Concern Type</InputLabel>
             <Select label='Select Concern Type'
                value={concernId} 
                onFocus={()=>handleError('concernId',null)} error={error.concerntId} 
                onChange={(e)=>setConcernId(e.target.value)}>
                  {fillAllConcern()}
                </Select>
                {error.concernId?<span  style={{color:'#d32f2f',paddingLeft:13,fontSize:13,fontFamily:"Bree Serif"}}>{error.concernId}</span>:<></>}

              </FormControl>
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
                 onFocus={()=>handleError('type',null)}
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
                 onFocus={()=>handleError('packaging',null)}
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
        <ReactQuill modules={modules}  theme="snow" value={description} onChange={(e)=>setDescription(e)} />
        </Grid>
        <Grid item xs={6} >
                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                    Upload Picture
                    <input onClick={()=>handleError('picture',null) }  onChange={handlePicture} type='file' hidden  accept="images/*" multiple />
                </Button>
                {error.picture?<span style={{color:'red', color:"#d32f2f" ,marginLeft:12 ,fontSize:13}} >{error.picture}</span>:<></>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',flexWrap:'wrap' }}>
                 {showImage()}
                 </Grid>
                <Grid item xs={6}>
                    <Button  onClick={handleSubmit} variant="contained" fullWidth >
                        Submit
                    </Button>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={handleReset} variant="contained" fullWidth >
                       Reset
                    </Button>
                </Grid>
        </Grid>

        </div>
    </div>)




}