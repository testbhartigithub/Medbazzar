import { useState, useEffect } from "react";
import { Grid, Button, TextField, Avatar } from "@mui/material";
import { useStyles } from "./SubCategoryCss";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postData, getData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { FormControl, Select, InputLabel, MenuItem } from "@mui/material";

export default function SubCategory() {
  var classes = useStyles();
  const [picture, setPicture] = useState({
    file: "subcategory.png",
    bytes: "",
  });
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [error, setError] = useState({});
  const [categoryList, setCategoryList] = useState([]);

  const FetchAllCategory = async () => {
    var result = await getData("category/display_all_category");
    if (result.status) {
      setCategoryList(result.data);
      alert(JSON.stringify(result.data));
    }
  };

  useEffect(function () {
    FetchAllCategory();
  }, []);

  const fillAllCategory = () => {
    return categoryList.map((item) => {
      return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>;
    });
  };

  const handlePicture = (event) => {
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleReset = () => {
    setCategoryId("");
    setSubCategory("");
    setPicture({ file: "subcategory.png", bytes: "" });
  };

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };

  const handleSubmit = async () => {
    var submit = true;
    if (categoryId.length == 0) {
      handleError("categoryid", "Pls insert category_ID...");
      submit = false;
    }
    if (subcategory.length == 0) {
      handleError("subcategory", "Pls insert category name...");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "Pls choose Picture");
      submit = false;
    }
    if (submit) {
      var formData = new FormData();
      formData.append("categoryid", categoryId);
      formData.append("subcategoryname", subcategory);
      formData.append("picture", picture.bytes);
      var result = await postData("subcategory/submit_subcategory", formData);

      if (submit) {
        Swal.fire({
          icon: "Success",
          title: result.msg,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "Error",
          title: result.msg,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TitleComponent
              title="Add Subcategory"
              logo="Medbazzar-logo.png"
              listicon="list.png"
              page="/dashboard/displayallsubcategory"
            />
          </Grid>

          <Grid item xs={12}>
            {/* onFocus={()=>handleError('categoryid',null)} error={error.categoryid} helperText={<span style={{ fontFamily:"Bree Serif", color:'red', color:"#d32f2f" ,fontSize:13}} >{error.categoryid}</span>} onChange={(event)=>setCategoryId(event.target.value)}
             */}
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                label="Category"
                value={categoryId}
                onFocus={() => handleError("categoryid", null)}
                error={error.categoryid}
                helperText={
                  <span
                    style={{
                      color: "#d32f2f",
                      fontSize: 13,
                      fontFamily: "Bree Serif",
                    }}
                  >
                    {error.categoryid}
                  </span>
                }
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {fillAllCategory()}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={subcategory}
              onFocus={() => handleError("subcategory", null)}
              error={error.subcategory}
              helperText={
                <span
                  style={{
                    fontFamily: "Bree Serif",
                    color: "red",
                    color: "#d32f2f",
                    fontSize: 13,
                  }}
                >
                  {error.subcategory}
                </span>
              }
              onChange={(event) => setSubCategory(event.target.value)}
              label="SubCategory Name"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={6}>
            <Button
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload Picture
              <input
                onChange={handlePicture}
                type="file"
                hidden
                accept="images/*"
                multiple
              />
            </Button>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Avatar
              alt="Remy Sharp"
              src={picture.file}
              style={{ display: "flex", height: 70, width: 70 }}
              variant="rounded"
            />
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
