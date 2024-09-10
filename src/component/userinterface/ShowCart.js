import { Divider, Grid, Paper } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { useNavigate } from "react-router-dom";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch } from "react-redux";
import {useSelctor} from  'react-redux';



export default function ShowCart(props){

    var dispatch=useDispatch()

    var productFromRedux=props.products
    var product=Object.values(productFromRedux)
    // alert(JSON.stringify(product))
   
    const handlechange=(v,item)=>{
        if(v>0)
        {
          item['qty']=v
          dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
        }
        else
        {
          dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
        } 
         props?.setPageRefresh(!props.pageRefresh)
              
      }

    var theme=useTheme()
    var navigate=useNavigate()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
   


    function handleNavigate(){
        navigate('/home')
    }
   

    const CartItems=()=>{
    
        return product.map((item,i)=>{
          return (
            
                <Grid container spacing={2} padding={3}>
                 <Paper style={{display:'flex',padding:5,width:"100%"}}>
                    <Grid item xs={2} >
                    
                    <div  style={{ display: 'flex', width:'100%',width:'100%',height:'auto',justifyContent: 'center',margin:3,boxShadow:'1px 1px 10px #f7f1e3'}}>
                <img src={`${serverURL}/images/${item.picture}`} style={{width: "75%",borderRadius: 10, height: '100px', }} />
            </div>
                    </Grid>
                    <Grid item xs={8} margin={1}>

                     <div style={{fontSize:matchesMd?'1.0em':"1.3em",}} >{item.description} {item.weight}{item.weighttype}
                          {/* {item.qty} {item.packaging} */}
                          <div>
                          
                          </div>
                     </div> 
                     <div style={{color:'grey',marginBottom:10}}>
                      {item.productsubname}
                      </div>
                     
                     <div style={{fontWeight:'bold',marginBottom:12}} > &#x20B9;{item.price}
                     <span style={{display:'flex',width:'45%',marginLeft:'auto',}}> <PlusMinusComponent qty={item?.qty}  onChange={(v)=>handlechange(v,item)} /></span>
                    

                      </div>

                    <Paper elevation={0} >
                   <div style={{color:'red',display:'flex',alignItems:'center',marginBottom:12}}><TimerOutlinedIcon /> <span style={{color:'grey'}}>Dilivery within 2-3 days</span></div>
                    </Paper>

                   <Divider />

                  <div style={{color:'red',display:'flex',alignItems:'center',marginTop:12,marginBottom:12}}><DeleteForeverOutlinedIcon />Remove <span style={{color:'black',paddingLeft:45}}><BookmarkAddOutlinedIcon /></span ><span  style={{color:'black'}}>Add to favourite</span></div>
           
                 
                 </Grid>
                 <Divider />
                  <Grid item xs={2}>

                 </Grid>  
                 </Paper>
                </Grid>
               
               
            
        )})

   

   
}
return(<div style={{fontFamily:'kanit'}}>
 
<div style={{fontSize:20,margin:10,marginLeft:30}}>
    {product.length} Items in your Cart
</div>


<div style={{margin:20}} >
  
{CartItems()}
</div>
<div style={{display:'flex',alignItems:'center',margin:20}}>
    <AddBoxOutlinedIcon onClick={handleNavigate} style={{cursor:'pointer'}}/><span>Add more items</span>
</div>
</div>
)

}
