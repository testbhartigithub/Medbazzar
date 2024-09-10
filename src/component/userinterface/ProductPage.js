import ProductPicture from "./ProductPicture";

import ProductInformation from "./ProductInformation";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useState } from "react";
import Header from "./Header";

export default function ProductPage() {
  const [pageRefresh, setPageRefresh] = useState(false);
  var theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  var location = useLocation();
  var item = location?.state?.data;
  // alert(JSON.stringify(item))

  return (
    <div>
     
      
        <div style={{overflow:'hidden',width:'100%'}}>
          <Header />
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <ProductPicture item={item} />
            </Grid>
            <Grid item md={6} xs={12}>
              <ProductInformation

                pageRefresh={pageRefresh}
                setPageRefresh={setPageRefresh}
                item={item}
              />
            </Grid>
          </Grid>
        </div>
      
    </div>
  );
}
