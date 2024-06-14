"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <header>
      <Box sx={{  paddingY: 2 ,borderBottom: "1px solid #6c757d" }}  >
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item ml={15}>
            <Grid container spacing={5} alignItems="center" >
            <Grid item>
                <Link href="/">
                  <img src="https://hamart-shop.vercel.app/_next/static/media/logo-black.de19b08e.svg" alt="logo" />
                </Link>
              </Grid>
              <Grid item>
                <Link href="/">
                  <Typography variant="h7"style={{fontWeight:"bold"}} color="#525258">
                    Home
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/facebook">
                  <Typography variant="h7" style={{fontWeight:"bold"}}color="#525258">
                    Shop
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          <Grid item mr={10}>
            <Grid container spacing={7} alignItems="center">
              <Grid item>
                <Link href="/">
                  <Typography variant="h7" style={{fontWeight:"bold"}} color="#525258">
                    Register
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/">
                  <Typography variant="h7"style={{fontWeight:"bold"}} color="#525258">
                    Login
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}

export default Header;
