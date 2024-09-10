import MaterialTable from "@material-table/core"
import { useStyles } from "./CategoriesCss";
import { useState,useEffect } from "react";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Button,Grid,Avatar,TextField} from "@mui/material";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";




export default function DisplayAllCategory(){
    var navigate=useNavigate()
    var classes=useStyles()
    const [categorydata ,setCategoryData]=useState([])
    const [open,setOpen]=useState(false)

   
const [picture,setPicture]=useState({file:'logo.png',bytes:''})
const [error,setError]=useState({})
const [category,setCategory]=useState('')
const [categoryId,setCategoryId]=useState('')
const [showBtn,setShowBtn]=useState(false)
const [tempPicture,setTempPicture]=useState('')

 const handlePicture=(event)=>{
    handleError('picture',null)
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
}


const handleCancel=()=>{
  setPicture({file:tempPicture,bytes:''})
  setShowBtn(false)
}


const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

  }

  
  const FetchAllCategory=async()=>{
    var result=await getData ("category/Display_All_Category")
    if(result.status)
    {
      setCategoryData(result.data)
    }
  }

  useEffect(function(){
    FetchAllCategory()
  },[])


    
    
    const handleClose=()=>{
      setOpen(false)
    }

    const handleOpen=(rowData)=>{
      setOpen(true)
      setCategoryId(rowData.categoryid)
      setCategory(rowData.categoryname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTempPicture(`${serverURL}/images/${rowData.picture}`)
    }

   
const handleUpdate=async()=>{

  var submit=true
  if(category.length==0)
  {
      handleError('category','Pls insert category name...')
      submit=false
  }
  
  if(submit)   
   {  
      var body={categoryid:categoryId,categoryname:category}
      var result= await postData('category/update_category_Data',body)
      if(result.status)
   {
    Swal.fire({
        icon:'Success',
        title: result.message,
        timer:1500,
        toast:true
       
      });
 }
else{
    Swal.fire({
        icon:'Error',
        title: result.message,
        timer:1500,
        toast:true
      });

  }
      FetchAllCategory() 
  }
}

const handleCategoryPicture=async()=>{

   var formData= new FormData()
   formData.append('categoryid',categoryId)
   formData.append('picture',picture.bytes)
   var result=await postData('category/edit_category_picture',formData)
   FetchAllCategory()
   if(result.status)
   {
    Swal.fire({
        icon:'Success',
        title: result.message,
        timer:1500,
        toast:true
       
      });
 }
else{
    Swal.fire({
        icon:'Error',
        title: result.message,
        timer:1500,
        toast:true
      });

  }

 }

 
const handleDelete=async(rowData)=>{
  
 
  
    Swal.fire({
      title: "Do you want to Dalete This Category?",
      toast:true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={categoryid:rowData.categoryid}
        var result=await postData('category/delete_category',body)
        if(result.status)
        {Swal.fire("Deleted", "", "success");
        FetchAllCategory() }
        else
        Swal.fire("Fail to delete record", "", "success");
       
      } else if (result.isDenied) {
        Swal.fire("Your record is safe", "", "info");
      }
    });

    }
  
  




  
  

    const showCategoryForm=()=>{

      return(

       
      <Dialog 
      open={open}
      onclose={handleClose}  
      maxWidth={"md"} >

        
        <DialogContent>
        <div className={classes.box}>
                <Grid container spacing={3}>
                <Grid item xs={12}>
                    < TitleComponent  title="Edit Category" logo="Medbazzar-logo.png" listicon="list.png"/>
                   </Grid>

                 <Grid item xs={12}>
                    <TextField  value={category} onFocus={()=>handleError('category',null)} error={error.category} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.category}</span>} onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth></TextField>
                </Grid>

                <Grid item xs={6}>
                  {showBtn?<div style={{ display:'flex',width:'100%',height:90 ,justifyContent:'center', alignItems:'center',justifyContent:'space-evenly'}}><Button onClick={handleCategoryPicture} variant="contained">Save</Button><Button  variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{ display:'flex',width:'100%',height:90 ,justifyContent:'center', alignItems:'center'}}>

                <Button component="label" variant="contained" fullWidth startIcon={<CloudUploadIcon />}>
                    Set New Picture
                    <input onClick={()=>handleError('picture',null) }  onChange={handlePicture} type='file' hidden  accept="images/*" multiple />
                </Button >
                {error.picture?<span style={{color:'red', color:"#d32f2f" ,marginLeft:12 ,fontSize:13}} >{error.picture}</span>:<></>}
                </div>}
                </Grid>
                <Grid item xs={6} style={{display:'flex' , justifyContent:'center'}}>
                <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:70,height:70}}/>
                </Grid>
                </Grid>
            </div>

        </DialogContent>
       <DialogActions>
       <Button onClick={handleUpdate}>Edit</Button> 
       <Button onClick={handleClose}>Close</Button> 

       </DialogActions>
      </Dialog>
      )

    }


    function showCategory() {
        
        return (
          <MaterialTable
            title="Main Categories"
            columns={[
              { title: 'Category Id', field: 'categoryid' },
              { title: 'Category Type', field: 'categoryname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:40 , height:40,borderRadius:12 }} />  </>},

                                                              // <>{rowData.categoryname=="Medicine"?<>Hello</>:<>Hii</>}</>
                                                              //For Change In Particular Feild
            ]}

            options={{
              paging:true,
              pageSize:4,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,10],    // rows selection options
            }}
            data={categorydata}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Category ',
                onClick: (event, rowData) =>handleOpen(rowData)
              },
      
              {
                icon: 'delete',
                tooltip: 'Delete Category ',
                onClick: (event, rowData) =>handleDelete(rowData)
              },
              
                {
                  icon: 'add',
                  tooltip: 'Add Category',
                  isFreeAction: true,
                  onClick: (event) => navigate('/dashboard/category')
                }
             
            ]}
          />
        )
      }

      return( <div className={classes.root}>
        <div className={classes.tablebox}>
        {showCategory()}
        </div>
        {showCategoryForm()}
      </div>)


      
}