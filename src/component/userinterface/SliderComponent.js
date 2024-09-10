import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { createRef } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function SliderComponent(props) {
  
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

  var sld=createRef()
  var settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
  };
  var banners = props?.data
  
  var images = Object.values(banners)[0]?.picture.split(",");
  const showSlide = () => {
    return images?.map((item) => {
      return (
        <div>
          <img
            src={`${serverURL}/images/${item}`}
            style={{
              width: "95%",
              borderRadius: 10,
             
              
              marginLeft: "auto",
              marginRight: "auto",
              aspectRatio: 3/1.5,
            
            }}
          />
        </div>
      );
    });
  };
  const handleForward=()=>{
    sld.current.slickNext()

  }
  const handleBackward=()=>{
    sld.current.slickPrev()
  }
  return (
    <div style={{ width: "100%",position:'relative' }}>
      {matchesMd?<div></div>:<div><div style={{zIndex:2,top:'40%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:28,height:30,borderRadius:10,background:'#95a5a6',opacity:0.5}}>
      <ArrowBackIosIcon onClick={handleBackward}/>
      </div>
      
      <div style={{zIndex:2,top:'40%',right:'0.07%', position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:28,height:30,borderRadius:10,background:'#95a5a6',opacity:0.5}}>
      <ArrowForwardIosIcon onClick={handleForward}/>
      </div>
    </div>}
      <Slider ref={sld} {...settings}>{showSlide()}</Slider>
    </div>
  );
}
