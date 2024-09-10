import BrandComponent from "../../component/userinterface/BrandComponent";
import CategoryComponent from "../../component/userinterface/CategoryComponent";
import Header from "../../component/userinterface/Header";
import ProductComponent from "../../component/userinterface/ProductComponent";
import SliderComponent from "../../component/userinterface/SliderComponent";
import { useState } from "react";
import { postData,getData} from "../../services/FetchNodeServices";
import { useEffect } from "react";
import FooterComponents from "../../component/userinterface/FooterComponent"
import ConcernComponent from "../../component/userinterface/ConcernComponent"

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Home(){

  const [bannerList, setBannerList]=useState([])
  const [brandList, setBrandList]=useState([])
  const [categoryList, setCategoryList]=useState([])
  const [productDetailList, setProductDetailList]=useState([])
  const [pageRefresh, setPageRefresh]=useState(false)
  const [concernList, setConcernList]=useState([])


  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up('md'));
  const fetchallbanner=async()=>{

    var result=await postData("userinterface/show_all_banner",{bannertype:"general"})
    setBannerList(result.data)

  }
  const fetchallbrand=async()=>{

    var result=await getData("userinterface/show_all_brand")
    setBrandList(result.data)

  }

  
  const fetchallcategory=async()=>{

    var result=await getData("userinterface/show_all_category")
    setCategoryList(result.data)

  }

  
  const fetchallProductDetails=async(offertype)=>{

    var result=await postData("userinterface/Display_All_Product_By_Offer",{offertype})
    setProductDetailList(result.data)

  }

  
  const fetchallconcern=async()=>{

    var result=await getData("userinterface/show_all_concern")
    setConcernList(result.data)

  }

  useEffect(function(){
    fetchallbanner()
    fetchallbrand()
    fetchallcategory()
    fetchallProductDetails('Weakend Sale')
    fetchallconcern()
   },[])

  return(<div style={{overflow:'hidden',}}>
    <Header />
     {/* <MenuBar />  */}
    <div style={{marginTop:30}}><SliderComponent data={bannerList}/></div>
    <div  > <BrandComponent  title='Brands' data={brandList} /></div>
    <div style={{marginTop:30}} > <CategoryComponent  title='Browse by category ' data={categoryList} /></div>
    <div style={{marginTop:30,}} > <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title='Trending products'  data={productDetailList}/></div>
    <div style={{marginTop:30,}}><ConcernComponent title='Concern' data={concernList}/></div>
    <div style={{marginTop:30}}>{matchesMd?<div style={{}}><FooterComponents /></div>:<div></div>
    }</div>
    
    {/* <MenuCart/> */}
   
    
  </div>
  
  )

// return(<SideBar/>)
 
 
}

   