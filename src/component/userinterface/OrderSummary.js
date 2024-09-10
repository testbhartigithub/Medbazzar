import { serverURL } from "../../services/FetchNodeServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

 export default function OrderSummary(props){


   
    var productFromRedux=useSelector(state=>state.data)
    var values=Object.values(productFromRedux)
    var product 
   
    var theme=useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));


    if(values?.length==0){
        product=props?.item
        product['qty']=0
     }
     else{
        
         var prd=productFromRedux[props.item?.productdetailid]
         if(prd===undefined)
         {   
             product=props?.item
             product['qty']=0 
          }
 
          else{
             product=prd
            }
        
       
     }
 
   
   
    return(
        <div style={{display:'flex',height:'auto',weight:'100vw',background:'#fff',boxShadow:'1px 1px 10px',fontFamily:'kanit'}} >
            <Grid container spacing={2}>
             <Grid item xs={12}>
            <div style={{display:'flex',background:'pink'}}>
            <h2 style={{display:'flex',marginLeft:'7%'}}>Order Summery</h2>
            </div>    
            </Grid>   
            <Grid item xs={2}>
                    
                    <div  style={{ display: 'flex', width:'100%',background:'red',height:'88%',marginLeft:5,justifyContent: 'center',margin:3,boxShadow:'1px 1px 10px 0px #f7f1e3'}}>
                <img src={`${serverURL}/images/${product?.picture}`} style={{width: "100%",}} />
            </div>
                    
        </Grid>
             <Grid item xs={10}>
           <div style={{marginLeft:18}}>
           <div style={{fontSize:matchesMd?'1.0rem':'1.3rem',margin:5,}} >{product?.description} {product?.weight}{product?.weighttype}
                       
                          <div>
                          
                          </div>
                     </div> 
                     <div style={{color:'grey',marginBottom:10,marginLeft:5}}>
                      {product?.productsubname}
                      </div>
                     
                      {product?.offerprice==0? <span> &#x20B9;{product?.price}</span>:
       <div>
       <span style={{textDecoration:'line-through',fontWeight:600,color:'grey',}}> &#x20B9;{product?.price}</span>
       <span> &#x20B9;{product?.offerprice}</span>
       </div>}
           </div>
          </Grid>       
        </Grid>    
        </div>  )
 }