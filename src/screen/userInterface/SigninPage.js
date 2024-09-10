import { Grid } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import SigninImage from "../../component/userinterface/LoginComponents/SigninImage";
import LoginOTP from "../../component/userinterface/LoginComponents/LoginOTP";
import Header from "../../component/userinterface/Header";
export default function SigniInPage(){

    var theme=useTheme()
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));

    return(
        <Grid container={2}>
            <Grid xs={12}>
                <Header />
            </Grid>
            <Grid md={6}>
{!matchesMd?<div style={{display:'flex',height:'100vh',justifyContent:'center',alignItems:'center',alignItems:'center'}}>
    <SigninImage/>
</div>:<div></div>}
        </Grid>
       <Grid xs={12} md={6}>
{LoginOTP()}
       </Grid>
       </Grid> 

     )
}