import { Grid } from "@mui/material";
import FilterList from "../../component/userinterface/FilterList"
import Header from "../../component/userinterface/Header";
import MenuBar from "../../component/userinterface/MenuBar";
import ProductList from "../../component/userinterface/ProductList";
import { postData } from "../../services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { json, useLocation ,useParams} from "react-router-dom";
import { useEffect,useState } from "react";

export default function FilterPage (props){
   
    var location=useLocation()
    var param=useParams()
    const [product,setProduct]=useState([])
    const [pageRefresh,setPageRefresh]=useState(false)
    
    var categoryid=''
    try{
        if(location?.state?.categoryid==undefined)
            categoryid=null
        else
        categoryid=location?.state?.categoryid
    }catch(e){
        {categoryid=null}
    }

    var subcategoryid=''
    try{
        if(location?.state?.subcategoryid==undefined)
            subcategoryid=null
        else
        subcategoryid=location?.state?.subcategoryid
    }catch(e){
        {subcategoryid=null}
    }

    //  var pattern=''
    // try{
    //     if(location?.state?.pattern==undefined)
    //         pattern=null
    //     else
    //     pattern=location?.state?.pattern
    // }catch(e){
       
    // }

    const fetchAllProduct=async()=>{
        var result=await postData('userinterface/display_all_productdetail_by_category',{'categoryid':categoryid,'subcategoryid':subcategoryid,"pattern":param['*']})
        setProduct(result.data)
             
    }
    

   useEffect(function(){
    fetchAllProduct()
   },[param['*']])
   
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));

    return(
        <Grid container spacing={2} style={{width:'100%',fontFamily:'kanit',display:'flex'}}>
        <Grid item xs={12} style={{display:'flex',width:'100%'}}>
            <Header/>

        </Grid>
        {matches?  <Grid item xs={4} style={{background:'#fff'}}>
            <FilterList/>
        </Grid>:<div></div>}
        <Grid item xs={matches?8:12} style={{background:'#fff' }}>
        < ProductList pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} data={product}/>
        </Grid>
       
    </Grid>)
}