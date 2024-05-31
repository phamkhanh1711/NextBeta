"use client";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
function Food_detail({ params }) {
  const { foodId } = params;

  console.log("check params", foodId);

  const [formData, setFormData] = useState({
    foodId: "",
    foodName: "",
    foodPrice: "",
  });
  useEffect(() => {
    axios
      .get(`http://localhost:4000/food/print-detailFood/${foodId}`)
      .then((res) => {
        console.log(res);
        const data = res.data;
        setFormData({
          foodName: data.foodName,
          foodPrice: data.foodPrice,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [foodId]);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      foodId: params.foodId,
      foodName: formData.foodName,
      foodPrice: formData.foodPrice,
    };
    axios
      .put(`http://localhost:4000/food/update/${params.foodId}`, data)
      .then((res) => {
        console.log(res);
        alert("Edit product successfully");
        router.push("/Foods");
      })
      .catch((err) => {
        console.log(err);
        alert("Edit product failed");
      });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>Food Detail</h1>
      </Grid>
      <Grid container item xs={12} spacing={2} direction="row">
        <Grid item xs={4}>
          <TextField
            id="outlined-basic"
            label="Food Name"
            variant="outlined"
            name="foodName"
            fullWidth
            value={formData.foodName}
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
            value={formData.foodPrice}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        onClick={handleSubmit}
        variant="contained"
        type="submit"
        sx={{ width: 300, mt: 2, ml: 2 }}>
        Cập Nhật Đồ Ăn
      </Button>
    </Grid>
  );
}
export default Food_detail;
