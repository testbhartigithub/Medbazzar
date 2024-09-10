import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchNodeServices";
import { Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useStyles } from "../ComponentsCss/ProductsCss";
import Rating from "@mui/material/Rating";
import mainlogo from "../../../src/assets/medbazzar-logo.png";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import Stack from "@mui/material/Stack";
import { Divider,Paper } from "@mui/material";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProductList(props) {
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSm = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXl = useMediaQuery(theme.breakpoints.down("xl"));

  var classes = useStyles();
  var navigate = useNavigate();
  var dispatch = useDispatch();

  var product = props?.data;
  console.log(props?.data);

  var productFromRedux = useSelector((state) => state.data);
  var productRedux = Object.values(productFromRedux);

  const showSlide = (item) => {
    return (
      <div onClick={() => handleNavigate(item)} className={classes.imgdiv}>
        <img
          src={`${serverURL}/images/${item.picture}`}
          className={classes.image}
        />
      </div>
    );
  };

  const handleChange = (v, item) => {
    if (v > 0) {
      item["qty"] = v;
      dispatch({ type: "ADD_PRODUCT", payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: "DELETE_PRODUCT", payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };

  const handleNavigate = (item) => {
    navigate("/productpage", { state: { data: item } });
  };

  const ProductDetail = () => {
    return product?.map((item) => {
      return (
        <div style={{ width: "48%" }}>
           <Grid container spacing={1} padding={5} >
           <Paper style={{padding:5}}>
          <Grid item xs={12}>
            <BookmarkAddOutlinedIcon className={classes.BookMark} />
          </Grid>
          <Grid item xs={12}>
            {showSlide(item)}
          </Grid>
          <Grid style={{ paddingLeft: matchesMd ? 50 : 150 }}>
            <img src={mainlogo} style={{ width: 85 }} />
          </Grid>
          <Grid item xs={12}>
            <div
              style={{
                display: "flex",
                fontSize: matchesMd ? "1.0em" : "1.0em",
                marginLeft: 6,
              }}
            >
              {item.description.length <= 45 ? (
                <div>
                  {item.description}
                  <div>&nbsp;</div>
                </div>
              ) : (
                item.description
              )}
            </div>
            <div style={{ width: "100%", marginLeft: 5 }}>
              {item.weight} {item.weighttype}
            </div>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              fontFamily: "kanit",
              marginLeft: 5,
              fontSize: matchesMd ? "1.0em" : "1.0em",
            }}
          >
            {item.offerprice == 0 ? (
              <span> &#x20B9;{item.price}</span>
            ) : (
              <div>
                <span
                  style={{
                    textDecoration: "line-through",
                    fontWeight: 600,
                    color: "grey",
                  }}
                >
                  {" "}
                  &#x20B9;{item.price}
                </span>
                <span> &#x20B9;{item.offerprice}</span>
              </div>
            )}
          </Grid>
          <Divider style={{ width: "100%", color: "#000" }} />
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Rating name="size-medium" defaultValue={3} />
            </Stack>
          </Grid>
        <div style={{display:'flex',flexDirection:'row'}}>
        <Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                  
                  <div style={{width:'100%',marginLeft:9}}>
                <PlusMinusComponent qty={productFromRedux[item?.productdetailid]?.qty==undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=> handleChange(v,item)} />
                </div>
                
     
             </Grid>
             <Grid item xs={6} style={{display:'flex',width:'90%',}}>
              
                 <Button onClick={()=>handleNavigate(item)} variant="text"  style={{color:'#fff', fontWeight:'bold',fontSize:12,width:'80%',background:'#000',margin:3}}>
                 Buy
                 </Button>
                 
                 </Grid>
                
        </div>
        </Paper>
        </Grid>
        </div>
      );
    });
  };

  return (
    <div style={{ display: "flex",flexDirection: "column" }}>
      <span>All Products</span>
      <div
        style={{
          display: "flex",
          width: "100%",
          margin: 3,
          // flexDirection: "row",
        }}
      >
        <Grid container spacing={1}>
          {ProductDetail()}
        </Grid>
        
      </div>
    </div>
  );
}
