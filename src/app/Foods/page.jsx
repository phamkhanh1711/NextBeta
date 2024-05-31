"use client";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Pagination from "@mui/material/Pagination";
import { Box, Grid, Stack, IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateIcon from "@mui/icons-material/Update";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";

function FoodProduct() {
  const [loading, setLoading] = useState(false);
  const [getData, setGetData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const itemsPerPage = 3; // Number of items per page

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:4000/food/all-Food")
      .then((response) => {
        console.log(response);
        setGetData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    // Add your delete logic here
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
  const paginatedData = getData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "75vh" }}
      ml={-17}>
      <Stack direction="row" spacing={6}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      <MenuItem onClick={handleAdd}>
                        <AddIcon />
                        Thêm Thức Ăn
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Box sx={{ mt: 2 }}>
        <Pagination
          count={Math.ceil(getData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Grid>
  );
}

export default FoodProduct;
