import { Button,Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchNodeServices";
import { postData } from "../../services/FetchNodeServices";


export default function PaymentDetails(props){


    const [caption , setCaption]=useState('Login To Proced')
    var navigate=useNavigate()

    var productFromRedux=props.products
    var product=Object.values(productFromRedux)
    
    var totalamount=product.reduce((p1,p2)=>{
        var amt =p2.qty*p2.price
        return p1+amt
    },0)

    var paidamount=product.reduce((p1,p2)=>{
        var amt =p2.qty*(p2.offerprice>0 ? p2.offerprice:p2.price)
        return p1+amt
    },0)

    var save=totalamount-paidamount  

    const generateOrder=async(razorpay_payment_id)=>{
        var  result=await postData('users/save_order',{userid:props?.userData?.userid,mobileno:props?.userData?.mobileno,
                                                      emailid:props?.userData?.emailid,paymentstatus:'Online',
                                                      paymentid:razorpay_payment_id,orderlist:product})
        alert(result.status)
    
    
       } 
    
  ///********Payment Gateway********** */
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: save*100, //  = INR 1
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

    var save=totalamount-paidamount
      const PaperBox1=()=>{
        return(<div style={{margin:20}}>
            <Grid container spacing={1}>
               <Grid item xs={6} style={{display:'flex',justifyContent:'center',fontWeight:'bolder'}}>
                   <i><u> Payment Details</u></i>
                </Grid>
                <Grid item xs={6} >
                   
                </Grid>
                <Grid item xs={6}>
               Total Amount
                </Grid>
                <Grid item xs={6}>
                &#x20B9;{totalamount}
                </Grid>
                <Grid item xs={6}>
               Discount Amount
                </Grid>
                <Grid item xs={6} style={{color:'green',fontWeight:'bolder'}}>
                &#x20B9;{save}
                </Grid>
               
                <Grid item xs={6}  style={{background:'yellow'}}>
                    Order Total
                   
                </Grid>
                <Grid item xs={6} >
                &#x20B9;{paidamount}
                </Grid>
                <Grid item xs={12}>
                    <div>
                       Price may very depending on te product batch
                    </div>
                </Grid>              
                </Grid>  
            
             
                </div>)
        }
      const PaperBox2=()=>{
        return(<Paper elevation={0} style={{paddingLeft:20,}}>
            <Grid container spacing={1}>
              <Grid item xs={12} >
                    <div>
                        Use Coopen  
                    </div>
                    <div>
                         Also get a gift code agter pacing this order
                    </div>
                </Grid>
               </Grid>
                
            </Paper>
             
            )
        }
       
const PaperBox3=()=>{
    return(<Paper elevation={0} style={{paddingLeft:20,boxShadow:'inset 1px 1px 1px 1px ',marginBottom:10}}>
        <Grid container spacing={1} >
        <Grid item xs={6}>  
        <input  type="radio" name="xx" defaultValue="cod" value="cod" />
            Cash On Delivery
        </Grid>
        <Grid item xs={6}>  
        <input  type="radio" name="xx" value="Make Payment" defaultValue="cod"/>
           Pay Online
        </Grid>
       
        <Grid item xs={6}>
            {product.length>1?<> {product.length} Items</>:<div>{product.length} Item</div> }
        </Grid>
        <Grid item xs={6}>
            <Button size='small' variant="contained" onClick={handleLogin} style={{background:'darkgreen'}}>{caption}</Button>
        </Grid>
        </Grid>
        </Paper>
    )
}
      return(<div style={{fontFamily:'kanit',margin:20,}}>
       
            <Grid container spacing={2} style={{marginTop:17,boxShadow:'inset 1px 1px 1px 1px '}}>
             <Grid item xs={12}>
                {PaperBox1()}
             </Grid>
                
                <Grid item xs={6}>
                {PaperBox2()}
                </Grid>
              
                <Grid item xs={12} >
                {PaperBox3()}    
                </Grid>
                <Grid item xs={12} style={{paddingLeft:30,width:'80%',boxShadow:'inset 1px 1px 1px 1px '}}>
               <div>
               <div >
                Dilivery Instrutions
                </div>
                <span>Add dilivery instructions</span>  
                </div>  
               </Grid>
            </Grid>    
      </div>)
   
}