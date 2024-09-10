import { Button, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/AddOutlined';
import MinusIcon from '@mui/icons-material/RemoveOutlined';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useEffect, useState } from "react";
import React from "react";
import { SnackbarProvider, useSnackbar } from 'notistack';

import Swal from "sweetalert2";



export default function PlusMinusComponent(props){

    const [value, setValue]=useState(props.qty)
 


    

    useEffect(function(){
      setValue(props.qty)
    },[props.qty,value])

    const handlePlus=()=>{
      
       setValue((prev)=>prev+1)
       var v=value 
       v=v+1
       props.onChange(v)

       Swal.fire({
        position: "bottom-end",
        icon: "success",
        title: "Add to cart",
        showConfirmButton: false,
        timer: 1800,
        width:230,
        toast:true,
        background:'#00391c',
        color:"#fff"
        
      });


      
    }

    const handleMinus=()=>{
      if(value>=1){
        setValue((prev)=>prev-1)
        var v=value
        v=v-1
        props.onChange(v)
      }
    }    
    

    return(<div style={{display:'flex',width:'100%'}}>

 {value==0?
         <div  style={{display:'flex',width:'60%'}}>
        
         <Button  onClick={handlePlus}   variant="outlined"  style={{fontWeight:'bold',fontSize:12,width:"100%"}}>
            Add <ShoppingCartOutlinedIcon   />
            </Button>
            
            </div>:
            <div style={{display:'flex',justifyContent:'start',alignItems:'center',background:'Darkgreen',width:'85%',justifyContent:'space-between',borderRadius:5}}>
       
          <div style={{color:'#fff',cursor:'pointer',marginTop:5}} onClick={handleMinus}> <MinusIcon/></div>
          <div style={{color:'#fff',fontSize:18,fontFamily:'kanit'}} >{value}</div>
          <div style={{color:'#fff',cursor:'pointer',marginTop:5}} onClick={handlePlus}><AddIcon/></div>
            </div>}
    </div>)
}