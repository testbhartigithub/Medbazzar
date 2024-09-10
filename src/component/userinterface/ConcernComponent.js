import React from "react";
import { serverURL } from "../../services/FetchNodeServices";
import Slider from "react-slick";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useStyles } from "../ComponentsCss/ConcernCss";


export default function Concern (props){

      var classes=useStyles()
        const theme = useTheme();
          const matches = useMediaQuery(theme.breakpoints.down('md'));
      
         var sld=createRef()
          var settings = {
          dots: false,
          infinite: true,
          speed: 500,
          slidesToShow:matches?4:6,
          slidesToScroll: 1,
          autoplay: false,
            };


    var concern=props?.data

    const concernImages=()=>{
        return concern.map((item)=>{

            return(
                 <div style={{}}>
                <img src={`${serverURL}/images/${item.icon} `} className={classes.image} />
            </div>
                )})
    }
    const handleForward=()=>{
        sld.current.slickNext()
     }
     const handleBackward=()=>{
       sld.current.slickPrev()
     }

    return(
        <div style={{width:'100%',position:'relative' }}>
           <div className={classes.title} style={{}}>{props?.title}</div>
            {matches?<div></div>:<div><div className={classes.ArrowBack} >
                <ArrowBackIosIcon onClick={handleBackward}/>
            </div>
      <div className={classes.ArrowForward} >
      <ArrowForwardIosIcon onClick={handleForward}/>
      </div></div>}
      <Slider  {...settings} ref={sld}>
         {concernImages()}
      </Slider>
      </div>
    )

   
}

