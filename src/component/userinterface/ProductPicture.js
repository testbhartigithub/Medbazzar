import { serverURL } from "../../services/FetchNodeServices";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { createRef } from "react";
import { Grid } from "@mui/material";
import { useState } from "react";
import { useStyles } from "../ComponentsCss/ProductPictureCss";
import ReactImageMagnify from 'react-image-magnify';

export default function ProductPicture(props){
  var classes=useStyles()

  var product=props?.item
  
  var images=product.multi_picture.split(",")
 
    const [sliderData,setSliderData]=useState(images[0])

    const handleImg=(index)=>{

      var slider=images[index]
      setSliderData(slider)
    }

    const showSlide=()=>{
        return images.map((item,index)=>{
            return(
                <div className={classes.imgdiv}>
                    <img src={`${serverURL}/images/${item}` } onMouseOver={()=>handleImg(index) } 
                     className={classes.img} />
                </div>
              )
        })
    }

    var sld=createRef()
    var settings = {
      dots: false,
      infinite: true,
      slidesToShow:4,
      slidesToScroll: 1,
      autoplay: true,
      vertical:true,
      arrows:false
    };

    const handleForward=()=>{
        sld.current.slickPrev()
      }
      
      const handleBackward=()=>{
        sld.current.slickNext()
      }

      
    return(
     <div style={{display:'flex',height:'100%'}} >

        <Grid  container >
          <Grid item xs={2}>
          <div className={classes.div1}>
          <div className={classes.div2}>  
         <div>
          <div className={classes.ArrowUp}>
             <KeyboardArrowUpOutlinedIcon onClick={handleBackward}/>
          </div> 
        
       <div >
         <Slider {...settings} ref={sld}>{showSlide()}</Slider>
       </div>
     
       <div className={classes.ArrowDown} >
      <KeyboardArrowDownOutlinedIcon onClick={handleForward}/>
      </div>

      </div>
      </div></div>
          </Grid>


          <Grid item xs={10} >
       <div className={classes.imgdiv2}>
       {/* <img src={`${serverURL}/images/${sliderData}`} width="100%"  /> */}
       <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src:`${serverURL}/images/${sliderData}`
    },
    largeImage: {
        src: `${serverURL}/images/${sliderData}`,
        width: 1200,
        height: 1800
    },
    enlargedImagePosition:'over',
    lensStyle:{color:''}
}} />
       </div>

          </Grid>  
        </Grid>
        </div>
   
    )
}