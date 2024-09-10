import { useState } from "react";
import { Button, Grid, TextField, Avatar } from "@mui/material";
import { useStyles } from "./CategoriesCss";
import TitleComponent from "../../component/admin/TitleComponent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";

export default function Categories(props) {
  var classes = useStyles();

  const [picture, setPicture] = useState({ file: "logo.png", bytes: "" });
  const [error, setError] = useState({});
  const [category, setCategory] = useState("");

  const handlePicture = (event) => {
    handleError("picture", null);
    setPicture({
      file: URL.createObjectURL(event.target.files[0]),
      bytes: event.target.files[0],
    });
  };

  const handleError = (label, msg) => {
    setError((prev) => ({ ...prev, [label]: msg }));
  };
  const handleReset = () => {
    setCategory("");
    setPicture({ file: "logo.png", bytes: "" });
  };

  const handleSubmit = async () => {
    var submit = true;
    if (category.length == 0) {
      handleError("category", "Pls insert category name...");
      submit = false;
    }
    if (picture.bytes.length == 0) {
      handleError("picture", "Pls choose Picture");
      submit = false;
    }
    if (submit) {
      var formData = new FormData();
      formData.append("categoryname", category);
      formData.append("picture", picture.bytes);
      var result = await postData("category/submit_Data", formData);

      if (submit) {
        Swal.fire({
          icon: "Success",
          title: result.message,
          timer: 1500,
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "Error",
          title: result.message,
          timer: 1500,
          toast: true,
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
              title="Add Category"
              logo="Medbazzar-logo.png"
              listicon="list.png"
              page="/dashboard/displayallcategory"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              value={category}
              onFocus={() => handleError("category", null)}
              error={error.category}
              helperText={
                <span
                  style={{
                    fontFamily: "Bree Serif",
                    color: "red",
                    color: "#d32f2f",
                    fontSize: 13,
                  }}
                >
                  {error.category}
                </span>
              }
              onChange={(event) => setCategory(event.target.value)}
              label="Category Name"
              fullWidth
            ></TextField>
          </Grid>

          <Grid item xs={6}>
            <Button
              component="label"
              variant="contained"
              fullWidth
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <input
                onClick={() => handleError("picture", null)}
                onChange={handlePicture}
                type="file"
                hidden
                accept="images/*"
                multiple
              />
            </Button>
            {error.picture ? (
              <span
                style={{
                  color: "red",
                  color: "#d32f2f",
                  marginLeft: 12,
                  fontSize: 13,
                }}
              >
                {error.picture}
              </span>
            ) : (
              <></>
            )}
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
            <Button onClick={handleSubmit} variant="contained" fullWidth>
              Submit
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button onClick={handleReset} variant="contained" fullWidth>
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
