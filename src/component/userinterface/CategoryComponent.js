import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createRef } from "react";

import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStyles } from "../ComponentsCss/CategoryCss";
import { useNavigate } from "react-router-dom";

export default function CategoryComponent(props) {
  const theme = useTheme();

  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  var classes = useStyles();
  var navigate = useNavigate();
  var sld = createRef();
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: matchesMd ? 3 : 3,
    slidesToScroll: 1,
    autoplay: false,
  };

  var images = props?.data;

  const showCategorySlide = () => {
    return images.map((item) => {
      return (
        <div onClick={() => handleGoToFilter(item)}>
          <div className={classes.imgdiv}>
            <img
              src={`${serverURL}/images/${item.picture}`}
              className={classes.mainimage}
            />
          </div>
          <div className={classes.categoryName}>{item.categoryname}</div>
        </div>
      );
    });
  };

  const handleGoToFilter = (item) => {
 
    navigate("/filterpage/null", { state: { categoryid: item.categoryid } });
  };

  const handleForward = () => {
    sld.current.slickNext();
  };
  const handleBackward = () => {
    sld.current.slickPrev();
  };

  return (
    <div className={classes.maindiv}>
      <div className={classes.title}>{props?.title}</div>
      {matchesMd?<div></div>:<div><div className={classes.ArrowBack}>
        <ArrowBackIosIcon onClick={handleBackward} />
      </div>
     
      <div className={classes.ArrowForward}>
        <ArrowForwardIosIcon onClick={handleForward} />
      </div></div>}
      <Slider {...settings} ref={sld}>
        {showCategorySlide()}
      </Slider>
    </div>
  );
}
