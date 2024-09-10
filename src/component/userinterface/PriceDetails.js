import { Button, Divider, Grid } from "@mui/material"
import { useState,useEffect } from "react"
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom"
import { serverURL } from "../../services/FetchNodeServices"
import { postData } from "../../services/FetchNodeServices"
export default function PriceDetails(props){

    
    const [caption , setCaption]=useState('Login to Proced')

    var navigate=useNavigate()
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

    const generateOrder=async(razorpay_payment_id)=>{
        var  result=await postData('users/save_order',{userid:props?.userData?.userid,mobileno:props?.userData?.mobileno,
                                                      emailid:props?.userData?.emailid,paymentstatus:'Online',
                                                      paymentid:razorpay_payment_id,orderlist:product})
        alert(result.status)
    
    
       } 

///********Payment Gateway********** */
const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    // amount: save*100, //  = INR 1
    name: "MedBazzar",
    description: 'some description',
    image:
      `${serverURL}/images/medbazzar-logo.png`,
    handler: function (response) {
         generateOrder(response.razorpay_payment_id)
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: props?.userData?.username,
      contact: props?.userData?.mobileno,
      email: props?.userData?.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  ////********************* */

    
  const handleLogin=()=>{
    if(caption.toUpperCase()==="MAKE PAYMENT")
    openPayModal()
    else
       
     navigate("/signin")

  }
  
  useEffect(function(){
    if(props?.userAddress?.length>0){
    setCaption("MAKE PAYMENT")
    }
},[props.userAddress])

// var totalamount=product.reduce((p1,p2)=>{
//     var amt =p2.qty*p2.price
//     return p1+amt
// },0)

// var paidamount=product?.reduce((p1,p2)=>{
//     var amt =p2.qty*(p2.offerprice>0 ? p2.offerprice:p2.price)
//     return p1+amt
// },0)
// var save=totalamount-paidamount

    return(
<div style={{display:'flex',width:'90%',background:'gray',height:'auto',boxShadow:'1px 1px 10px',fontSize:13}}>
<Grid container spacing={0.5}>
            <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
               <div style={{display:'flex',width:'100%',background:'#fff',}}>
               <h3 style={{display:'flex',marginLeft:60}}>Price Details</h3>
               </div>
            </Grid>

            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:60}}>Price ({1}item)</h3>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',justifyContent:'center',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:'40%'}}><s>&#8377;{product?.price}</s>/&#8377;{product?.offerprice}</h3>
                </div>
            </Grid>

            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:60}}>Delivery Charges</h3>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',justifyContent:'center',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:'50%'}}>Free</h3>
                </div>
            </Grid>
           
            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:60}}>Total Payable</h3>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',justifyContent:'center',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:'50%'}}>&#8377;{product?.offerprice}</h3>
                </div>
            </Grid>

            <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
               <div style={{display:'flex',width:'100%',background:'#fff',}}>
               <h3 style={{display:'flex',marginLeft:60,color:'green'}}>
                Your Total saving on this ordern {}
               </h3>
               </div>
                
            </Grid>

            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',background:'#fff',}}>
                <h3 style={{display:'flex',marginLeft:60}}>1-item</h3>
                </div>
            </Grid>
            <Grid item xs={6}>
                <div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',background:'#fff',}}>
                <Button size="small" variant="contained" onClick={handleLogin} style={{background:'darkgreen'}}>{caption}</Button>

                </div>
            </Grid>
        </Grid>
</div>
    )
}