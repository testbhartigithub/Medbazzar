import { Grid } from "@mui/material";
import { serverURL } from "../../services/FetchNodeServices";

export default function HomeCareComponent(props){
    return(<div>
        <Grid item xs={12} style={{display:'flex',justifyContent:'center'}}>
            <div><img src={`${serverURL}/images/homecare.jpg`} width='70%' /></div>
        </Grid>
    </div>)
}