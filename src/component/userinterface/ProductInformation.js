import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Button, Divider, Grid, Paper, Box, Checkbox } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import parse from 'html-react-parser'
import PlusMinusComponent from "./PlusMinusComponent";
import {useSelector} from 'react-redux'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useStyles } from "../ComponentsCss/ProductInformationCss";






export default function ProductInformation(props) {
    var classes=useStyles()
    var navigate=useNavigate()
    var dispatch=useDispatch()
    
    var productFromRedux=useSelector(state=>state.data)
    var values=Object.values(productFromRedux)
    var product 
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

    const showDescription = () => {
        return (<div style={{ fontFamily: 'Kanit' }}> {product?.weight} {product?.weighttype}</div>)
    }

    
return(<div style={{display:'flex',marginLeft:20,width:'100%'}}>
       <Grid container spacing={2} style={{ width: '98%', height: 'auto' }}>
       <Grid item xs={12}  >
       <Grid item xs={12} className={classes.grid2}>
      
       <div>
       {product?.productsubname}
       {showDescription()}
       <div className={classes.divBrandname}> {product?.brandname}
             <CircleIcon style={{ fontSize: 8, marginLeft: 10, marginRight: 10 }} /> {product?.weight} {product?.weighttype}
             <CircleIcon style={{ fontSize: 8, marginLeft: 10 }} />
             </div>
             <div style={{ display: 'flex', alignItems: 'center' }}>&#8377;{product?.offerprice != 0 ? product?.offerprice : product?.price}
                 <span style={{ fontSize: 16, fontWeight: 'lighter', display: 'flex', alignItems: 'center' }}>
                       (Incl. all Taxes)
                    </span>
                </div>  
              
                         <span className={classes.span1}>
                             <WatchLaterOutlinedIcon style={{ marginRight: 6 }} />Delivery within 2 hrs
                         </span>

                         <Divider style={{ borderWidth: 1.5, marginTop: 10 }}></Divider>
                         <span style={{ fontWeight: 'bold', fontSize: 18, color: 'grey', fontFamily: 'Kanit' }}>
                             <s>MRP: &#8377; {product?.price}</s>
                             <span style={{ margin: 5, color: 'black' }}>
                                 {product?.offerprice != 0 ? <span>(Save &#8377;{product?.price - product?.offerprice})</span> : <span></span>}
                             </span>
                         </span> 


               <div className={classes.divType}>Type</div>
                         <div className={classes.div1}>
                             <Button style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px', fontSize: 12,marginRight:7 }}>
                                 Bottle
                             </Button>

                             <Button style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px', fontSize: 14,marginRight:7 }}>
                                 Packs
                             </Button>

                             <Button style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px', fontSize: 14 ,marginRight:7}}>
                                 Strips
                             </Button>
                         </div> 
                         <div className={classes.divWeightType} >Weight-Type</div>
                        <div className={classes.div2} >
                            <Button  style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px',marginRight:7 }}>
                                LTR
                            </Button>
                            <Button style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px',marginRight:7 }}>
                                ML
                            </Button>

                            <Button style={{ backgroundColor: '#006266', color: '#fff', border: 'none', borderRradius: '5px',marginRight:7 }}>
                                KG
                            </Button>

                        </div>   
                        <div>
                            <Divider style={{ borderWidth: 1.5, marginTop: 15 }}></Divider>

                            <Checkbox color="primary" />
                            <span style={{ fontWeight:'lighter',fontSize: 16,fontFamily:'Kanit' }}>Send as a gift. Include custom message</span>
                        </div>                                                         
                        <div style={{ display: 'flex',marginTop:5,alignItems:'center',justifyContent:'space-around'}}>
                        
                   <PlusMinusComponent qty={product?.qty} onChange={(v)=>handlechange(v,product)} />
                   <Button onClick={()=>navigate('/home')} variant="text"  style={{display:'flex',color:'#fff',backgroundColor:'green',width:'70%',height:'75%',background:'#000'}}>
                    <span>Continue shoping</span>
                   </Button>
                   
                </div>
                <Divider style={{ borderWidth: 1.5, marginTop: 15 }}></Divider>

            <div style={{ fontFamily: 'Kanit', marginTop: 20, border: 'solid 1px', padding: 10, borderRadius: 10 }}>
               <div style={{ fontSize: 20 }}>Product Details</div>
               <Divider style={{ borderWidth: 1.5, marginTop: 5 }}></Divider>
              <div style={{ fontWeight: 'lighter', fontSize: 13 }}>
                  {parse(product?.PD_description)}
                  </div>
                </div>
             </div>
       
        </Grid>
        </Grid>
       </Grid>
    </div>)
   }