"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import {
  Box,
  Grid,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import useSWR from "swr";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddFood from "./add/page";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "2px solid #000",
  height: 400,
  boxShadow: 24,
  p: 4,
};

function FoodProduct() {
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const itemsPerPage = 3; // Number of items per page
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data, error } = useSWR(
    "http://localhost:4000/food/all-Food",
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMenuOpen = (event, foodId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFoodId(foodId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFoodId(null);
  };

  const handleDelete = (foodId) => {
    console.log(`Deleting food item with ID: ${foodId}`);
    const deleteUrl = `http://localhost:4000/food/delete/${foodId}`;
    console.log(deleteUrl);
    axios
      .delete(deleteUrl)
      .then((res) => {
        console.log(res);
        alert("Xóa Thức Ăn Thành Công");
        setFoods(Foods.filter((food) => food.foodId !== foodId));
      })
      .catch((error) => {
        console.log(error);
      });
    handleMenuClose();
  };
  const handleAdd = () => {
    console.log(`Adding food item`);
    router.push(`Foods/add`);
    handleMenuClose();
  };
  const router = useRouter();
  const handleEdit = (foodId) => {
    console.log(`Editing food item with ID: ${foodId}`);
    router.push(`Foods/edit/${foodId}`);
    handleMenuClose();
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "75vh", width: "100%" }} // Thêm chiều rộng 100%
    >
      <Stack direction="row" spacing={6} style={{ width: "100%" }}>
        {" "}
        {/* Thêm chiều rộng 100% */}
        <TableContainer component={Paper} style={{ width: "100%" }}>
          {" "}
          {/* Thêm chiều rộng 100% */}
          <Table sx={{ width: "100%" }} aria-label="simple table">
            {" "}
            {/* Thêm chiều rộng 100% */}
            <TableHead>
              <TableRow>
                <TableCell>foodId</TableCell>
                <TableCell align="right">foodName</TableCell>
                <TableCell align="right">foodImage</TableCell>
                <TableCell align="right">foodPrice</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.map((data) => (
                <TableRow key={data.foodId}>
                  <TableCell component="th" scope="row">
                    {data.foodId}
                  </TableCell>
                  <TableCell align="right">{data.foodName}</TableCell>
                  <TableCell align="right">
                    <img
                      src={data.foodImage}
                      alt="food"
                      width={50}
                      height={50}
                    />
                  </TableCell>
                  <TableCell align="right">{data.foodPrice}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="more"
                      aria-controls="product-menu"
                      aria-haspopup="true"
                      onClick={(event) => handleMenuOpen(event, data.foodId)}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="product-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl) && selectedFoodId === data.foodId}
                      onClose={handleMenuClose}>
                      <MenuItem onClick={() => handleDelete(data.foodId)}>
                        <DeleteIcon />
                        Xóa Thức Ăn
                      </MenuItem>
                      <MenuItem onClick={() => handleEdit(data.foodId)}>
                        <UpdateIcon />
                        Cập Nhật Thức Ăn
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <AddFood />
          </Table>
        </TableContainer>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Grid>
  );
}

export default FoodProduct;
