import MaterialTable from "@material-table/core"
import { useStyles } from "./SubCategoryCss";
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
import {FormControl,Select,InputLabel,MenuItem} from '@mui/material'


export default function DisplayAllSubCategory(){
    var navigate=useNavigate()
    var classes=useStyles()
    const [newsubcategory,setNewSubCategory]=useState([])
    const [open,setOpen]=useState(false)
    
    const [picture,setPicture]=useState({file:'subcategory.png',bytes:''})
    const [categoryId,setCategoryId]=useState('')
    const [subcategory,setSubCategory]=useState('')
    const [subcategoryId,setSubCategoryId]=useState('')
    const [error,setError]=useState({})
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')
    const [categoryList,setCategoryList]=useState([])
    
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



    

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]), bytes:event.target.files[0]})
        setShowBtn(true)
    }

    
    
const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))
}

const handleCancel=()=>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
}



    const FetchAllSubCategory=async()=>{
        var result=await getData('subcategory/Display_All_Subcategory')
        if(result.status)
        {setNewSubCategory(result.data)}
       
    }

    const handleEdit=async()=>{
        
  var submit=true
  if(categoryId.length==0)
  {
   submit=false
   handleError('categoryid','Pls Input CategoryID...')
  
  }
  if(subcategory.length==0)
  {
    submit=false
    handleError('subcategory','Pls Input Subcategory Name...')
    
   }
  
    if(submit)
  { 

        var body={categoryid:categoryId,subcategoryname:subcategory, subcategoryid:subcategoryId}
        var result=await postData('subcategory/update_subcategory_Data',body)
        
        if(result.msg)
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
        FetchAllSubCategory()
  }
    }

    const handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('subcategoryid',subcategoryId)
        formData.append('picture',picture.bytes)
        var result=await postData('subcategory/edit_subcategory_picture',formData)
       
         
            if(result.msg)
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
        
        FetchAllSubCategory()
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
        var body={subcategoryid:rowData.subcategoryid}
        var result=await postData('subcategory/delete_subcategory',body)
        if(result.status)
        {Swal.fire("Deleted", "", "success");
        FetchAllSubCategory() }
        else
        Swal.fire("Fail to delete record", "", "success");
       
      } else if (result.isDenied) {
        Swal.fire("Your record is safe", "", "info");
      }
    });

    }
 

    const ShowSubCategoryForm=(rowData)=>{
        return(
            
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}>
            
            <DialogContent>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                <TitleComponent title='Add Subcategory' logo='Medbazzar-logo.png' listicon="list.png" />
                </Grid>
               
                 <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select label='Categoryname' value={categoryId} onChange={(event)=>setCategoryId(event.target.value)}>
                {fillAllCategory()}
                  </Select>
                </FormControl>
    
                </Grid>
                <Grid item xs={12}>
                    <TextField  value={subcategory} onFocus={()=>handleError('subcategory',null)} error={error.subcategory} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.subcategory}</span>} onChange={(event)=>setSubCategory(event.target.value)} label="SubCategory Name" fullWidth></TextField>
                </Grid>

                <Grid item xs={6}>
                    {showBtn?<div style={{display:'flex',height:50,justifyContent:'center',alignItems:'center',justifyContent:'space-evenly'}}><Button variant="contained" onClick={handleEditPicture}>Save</Button ><Button  variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div>
                   <Button component="label" variant="contained" startIcon={<CloudUploadIcon />} fullWidth >
                    Set New Picture
                    <input onChange={handlePicture} type="file" hidden accept="images/*" multiple />
                   </Button>
                   </div>}
                </Grid>
                <Grid item xs={6} style={{display:'flex',justifyContent:'center'  }}>
                    <Avatar  alt="Remy Sharp" src={picture.file} style={{height:80,width:80}} variant="rounded" />
                 </Grid>
                
                 </Grid>
            </DialogContent>
            <DialogActions >
            <Button onClick={handleEdit}>Edit</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        )
    }
const handleOpen=(rowData)=>{
    setSubCategoryId(rowData.subcategoryid)
    setOpen(true)
    setCategoryId(rowData.categoryid)
    setSubCategory(rowData.subcategoryname)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.picture}`)
    
}
    const handleClose=()=>{
        setOpen(false)
    }


useEffect(function(){

    FetchAllSubCategory()
},[])
    function ShowSubCategory() {
        return (
          <MaterialTable
            title="Subcategory Data"
            columns={[
              { title: 'Categoryname', field: 'categoryname' },
              { title: 'Subcategory_Id', field: 'subcategoryid' },
              { title: 'Subcategory Name', field: 'subcategoryname' },
              { title: 'Picture', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:50,height:50,borderRadius:12}}/></> },
             
            ]}
            options={{
              paging:true,
              pageSize:4,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={newsubcategory}        
            actions={[
                {
                  icon: 'edit',
                  tooltip: 'Add Data',
                  onClick: (event, rowData) => handleOpen(rowData)
                },

                {
                    icon: 'delete',
                    tooltip: 'Delete Category ',
                    onClick: (event, rowData) =>handleDelete(rowData)
                  },
                  {
                    icon: 'add',
                    tooltip: 'Add SubCategory',
                    isFreeAction: true,
                    onClick: (event) => navigate('/dashboard/subcategory')
                  }
              ]}
          
          />
        )
      }

      return(<div className={classes.root}>
        <div className={classes.table}>
             {ShowSubCategory()}
             </div>
             {ShowSubCategoryForm()}
      </div>)
}