"use client";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { handleUploadFile } from "../../config/uploadImage";
function AddFood() {
  const [Food, setFood] = useState({
    foodName: "",
    foodPrice: "",
    foodImage: "",
  });
  const [errors, setErrors] = useState([]); // [foodName: 'Food Name cannot be empty', foodPrice: 'Food Price cannot be empty', foodImage: 'Image cannot be empty']
  const [fileName, setFileName] = useState("");
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    setFileName(imageFile.name);
    setFood({ ...Food, foodImage: imageFile });
  };

  const handleChange = (e) => {
    const nameInput = e.target.name;
    const value = e.target.value;
    setFood((state) => ({ ...state, [nameInput]: value }));
  };
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorsSubmit = {};
    let flag = true;
    if (Food.foodName === "") {
      errorsSubmit.foodName = "Food Name cannot be empty";
      flag = false;
    }
    if (Food.foodPrice === "") {
      errorsSubmit.foodPrice = "Food Price cannot be empty";
      flag = false;
    }

    if (Food.foodImage === 0) {
      errorsSubmit.foodImage = "Image cannot be empty";
      flag = false;
    } else {
      let size = Food.foodImage.size;
      let name = Food.foodImage.name;
      if (!name) {
        errorsSubmit.foodImage = "Please choose an image with a valid format";
        flag = false;
      } else {
        let ext = name.split(".").pop();
        let arrayExt = ["png", "jpg", "jpeg"];
        if (!arrayExt.includes(ext)) {
          errorsSubmit.foodImage = "Only upload file 'png', 'jpg', 'jpeg'";
          setFood({ ...Food, foodImage: "" });
          flag = false;
        } else if (size > 1024 * 1024) {
          errorsSubmit.foodImage = "Image size must be less than 1MB";
          flag = false;
        }
      }
    }
    let urlImage;
    if (Food.foodImage !== "") {
      urlImage = await handleUploadFile(Food.foodImage);
      setFood({ ...Food, foodImage: urlImage });
    }
    if (!flag) {
      setErrors(errorsSubmit);
      return;
    } else {
      setErrors({});

      const formData = {
        foodName: Food.foodName,
        foodPrice: Food.foodPrice,
        foodImage: urlImage,
      };

      axios
        .post("http://localhost:4000/food/add-food", formData)
        .then((response) => {
          console.log(response);
          alert("Add Food Success");
          router.push("/Foods");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <Grid container spacing={2} p={4}>
      <Grid item xs={12}>
        <h1>Add Food</h1>
      </Grid>
      <Grid onSubmit={handleSubmit} item xs={12}>
        <Grid container item xs={12} spacing={2} direction="row">
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Food Name"
              variant="outlined"
              name="foodName"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="outlined-basic"
              label="Food Price"
              variant="outlined"
              name="foodPrice"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="file"
            component="label"
            sx={{ width: 150, marginTop: "2%" }}>
            Upload File
            <input
              type="file"
              name="foodImage"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {fileName && (
            <Typography variant="body1" sx={{ marginLeft: 2, marginTop: "2%" }}>
              {fileName}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: 300, marginTop: "2%" }}
            onClick={handleSubmit}>
            Add Food
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
export default AddFood;
