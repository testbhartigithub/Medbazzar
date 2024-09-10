
import { Grid } from "@mui/material";
import { useState } from "react";
import { getData, serverURL } from "../../services/FetchNodeServices"
import { Button } from "@mui/material";
import { useEffect } from "react";

export default function MenuCart(){

    const[categoryList,setCategoryList]=useState([])

    
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
          return <Button >{item.categoryname}</Button>
      })
    }

return(<div style={{display:'flex', background:'#636e72'}}>
    <Grid container spacing={3} style={{display:'flex',color:'white',justifyContent:'space-evenly'}} >
        <Grid item xs={6} >
        Follow us
        </Grid>
        <Grid item xs={6} >
        Heloooooo
        </Grid>
        <Grid item xs={6} >
        Hyyyyyyy
        </Grid>
        <Grid item xs={6} >
        
        Hyyyyyyy
        
        </Grid>
        <Grid item xs={6} style={{display:'flex',color:'white',justifyContent:'space-evenly'}}>
            <Grid item xs={2}>
                 Category
            <div style={{color:'white'}}>{showAllCategory()}</div>
            </Grid>
            <Grid item xs={2}>
                Medicines
                </Grid>
            <Grid item xs={2}>
            Other
            </Grid>

</Grid>
<Grid item xs={6} style={{display:'flex',justifyContent:'space-evenly'}}>
            
            <Grid item xs={2}>
                Medicines
                </Grid>
            <Grid item xs={2}>
            Other
            </Grid>

</Grid>

        </Grid>

        
       
    
    </div>)
    
}