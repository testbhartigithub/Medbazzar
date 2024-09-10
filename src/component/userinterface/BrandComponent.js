import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Translate } from "@mui/icons-material";
import { useStyles } from "../ComponentsCss/BrandsCss";



export default function BrandComponent(props){

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  var classes=useStyles()


   var sld=createRef()
    var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow:matches?4:6,
    autoplay:true,
  
      };
      
    var brands=props?.data
     
    const showBrandSlide=()=>{
        
        return brands.map((item)=>{
            return (
              <div> 
               
                <div className={classes.imgdiv}>
            <img src={`${serverURL}/images/${item.picture}`} 
            className={classes.mainimages}/>
            </div>
            </div>
            
            )
        })
     }
    
    const handleForward=()=>{
       sld.current.slickNext()
    }
    const handleBackward=()=>{
      sld.current.slickPrev()
    }
    return(
        <div className={classes.maindiv}>
           <div className={classes.title}>{props?.title}</div>
        {matches?<div></div>:<div> <div className={classes.backArrow}>
            <ArrowBackIosIcon onClick={handleBackward}/>
         </div>
      <div className={classes.ForwardArrow}>
      <ArrowForwardIosIcon onClick={handleForward}/>
      </div></div>}

      <Slider  {...settings} ref={sld}>
         {showBrandSlide()}
      </Slider>
      </div>
    );
 


}

      
