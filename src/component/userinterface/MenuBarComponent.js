import { Button,Menu,MenuItem } from "@mui/material";
import { useState,useEffect } from "react";
import { serverURL,getData,postData } from "../../services/FetchNodeServices";
import { AppBar,Toolbar,Box } from "@mui/material";



export default function MenuBar(){
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    
  
  const FetchAllCategory=async()=>{
    var result=await getData ("userinterface/Display_All_Category")
    if(result.status)
    {
      setCategoryList(result.data)
    }
  }

  useEffect(function(){
    FetchAllCategory()
  },[])

  const showAllCategory=()=>{

    return categoryList.map((item)=>{
        return <Button onClick={(event)=>handleClick(item.categoryid,event)}>{item.categoryname}</Button>
    })
  }
   
  const handleClick=(categoryid,event)=>{
     
    FetchAllSubCategory(categoryid)
    setAnchorEl(event.currentTarget);
  }
  
  const FetchAllSubCategory=async(cid)=>{
    var result=await postData("userinterface/Fetch_all_subcategory_by_category",{categoryid:cid})
    setSubCategoryList(result.data)
  }

  const showAllSubCategory=()=>{

    return subCategoryList.map((item)=>{
        return <MenuItem>{item.subcategoryname}</MenuItem>
    })
  }
  const handleClose=()=>{
    setAnchorEl(null);
  }

    return(<div>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar style={{background:'#fff'}} position="static" >
     <Toolbar style={{display:'flex',justifyContent:'center'}} >
      {showAllCategory()}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {showAllSubCategory()}
       
      </Menu>
     </Toolbar>
   </AppBar>
 </Box>
    </div>)

}