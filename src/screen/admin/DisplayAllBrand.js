import MaterialTable from "@material-table/core"
import { useStyles } from "./BrandsCss"
import { useState,useEffect } from "react"
import { getData, postData, serverURL } from "../../services/FetchNodeServices"


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


export default function DisplayAllBrand(){
  var navigate=useNavigate()

  const [picture,setPicture]=useState({file:'brand.png',bytes:''})
  const [brand,setBrand]=useState('')
  const [brandid,setBrandId]=useState('')
  const [error,setError]=useState({})
  const [showBtn,setShowBtn]=useState(false)
  const [tempPicture,setTempPicture]=useState('')
  const handlePicture=(event)=>{
      setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setShowBtn(true)
  }

  const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg})) 
  }
    
    var classes=useStyles()
    const [newBrand,setNewBrand]=useState([])
    const [open,setOpen]=useState(false)
    
    const FetchAllBrand=async()=>{
        var result=await getData('brand/Display_All_Brand')
        if(result.status)
        {setNewBrand(result.data)}
       
    }
useEffect(function(){

    FetchAllBrand()
},[])

const handleClose=()=>{
  setOpen(false)
}

const handleOpen=(rowData)=>{
  setOpen(true)
  
  setBrandId(rowData.brandid)
  setBrand(rowData.brandname)
  setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
  setTempPicture(`${serverURL}/images/${rowData.picture}`)
}
const handleCancel=()=>{
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)
}

const handleEdit=async()=>{

  var submit=true
       if(brand.length==0)
       {
        submit=false
        handleError('brand','Pls Input Brand Name...')
        console.log(error)
       }
       
       if(submit)
       { 
      var body={brandid:brandid,brandname:brand}
      var result= await postData('brand/update_brand_data',body)
      if(result.status)
       {
        Swal.fire({
            icon: "Succes",
            title: result.msg, 
            timer: 1500, 
            toast:true          
          });  
       }

       else
       {
        Swal.fire({
            icon: "Error",
            title: result.msg,    
            timer: 1500,  
            toast:true      
          });   
       }
       FetchAllBrand()
    }
}


const handlePictureEdit=async()=>{
 var formData=new FormData()
 formData.append('brandid',brandid)
 formData.append('picture',picture.bytes)
  var result=await postData('brand/edit_brand_picture',formData)
  alert(result.msg)
  FetchAllBrand()
}

const handleDelete=async(rowData)=>{

  Swal.fire({
    title: "Do you want to Dalete This Brand?",
    toast:true,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Delete",
    denyButtonText: `Don't Delete`
  }).then(async(result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      var body={brandid:rowData.brandid}
      var result=await postData('brand/delete_brand',body)
      if(result.status)
      {Swal.fire("Deleted", "", "success");
      FetchAllBrand() }
      else
      Swal.fire("Fail to delete record", "", "success");
     
    } else if (result.isDenied) {
      Swal.fire("Your record is safe", "", "info");
    }
  });



 }


const showBrandForm=()=>{
return(
  <Dialog
  open={open}
  onClose={handleClose}
  maxWidth={"md"}>

    
    <DialogContent>
    <div className={classes.table}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Edit Brands" logo="Medbazzar-logo.png" listicon="list.png"/>
                  </Grid>
                <Grid item xs={12}>
                    <TextField value={brand} onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span  style={{color:'#d32f2f',fontSize:13,fontFamily:"Bree Serif"}}>{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name" fullWidth ></TextField>
                    </Grid> 
                <Grid item xs={6}>
                {showBtn?<div style={{display:'flex',justifyContent:'space-evenly',height:50,alignItems:'center'}}><Button onClick={handlePictureEdit}  variant="contained">Save</Button><Button onClick={handleCancel} variant="contained">Cancel</Button></div>:<>
                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                   Set new image 
                    <input onClick={()=>handleError('picture',null)} onChange={handlePicture}  type='file' hidden  accept="images/*" multiple />
                </Button> 
                 {error.picture?<span style={{color:'#d32f2f',fontSize:14, paddingLeft:12}}>{error.picture}</span>:<></>}
                 </>}
                   </Grid> 
                <Grid item xs={6} style={{display:'flex',justifyContent:'center' }}>
                    <Avatar  alt="Remy Sharp" src={picture.file}  variant="rounded" />
                    </Grid>  
            </Grid>
            </div>
    </DialogContent>
    <DialogActions>
    <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
)
}
    function showBrand() {
            return (
              <MaterialTable
                title="Brands List"
                columns={[
                  { title: 'Brand_Id', field: 'brandid' },
                  { title: 'Brand Name', field: 'brandname' },
                  { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:40,height:40,borderRadius:12}} /></>},
                ]}
                options={{
                  paging:true,
                  pageSize:4,       // make initial page size
                  emptyRowsWhenPaging: false,   // To avoid of having empty rows
                  pageSizeOptions:[3,5,7,10],    // rows selection options
                }}
                data={newBrand}        
                actions={[
                  {
                    icon: 'edit',
                    tooltip: 'Edit Brand',
                    onClick: (event, rowData) => handleOpen(rowData)
                  },
                  {
                    icon: 'delete',
                    tooltip: 'Delete User',
                    onClick: (event, rowData) => handleDelete(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add Brand',
                    isFreeAction: true,
                    onClick: (event) => navigate('/dashboard/brand')
                  }
                ]}
              />
            )
          }
    return(
        <div className={classes.root}>
            <div className={classes.table}>
            {showBrand()}
          </div>
          {showBrandForm()}
         </div>
    )

}
