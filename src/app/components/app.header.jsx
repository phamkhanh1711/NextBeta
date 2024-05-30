"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
function Header() {
  return (
    <header>
      <Box sx={{ backgroundColor: "blue", paddingY: 2 }}>
        <Grid
          container
          spacing={10}
          justifyContent="center"
          alignItems="center">
          <Grid item xs={12} sm="auto">
            <Typography
              variant="h5"
              style={{ color: "white", textAlign: "center" }}>
              <Link href="/">Home </Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Typography
              variant="h5"
              style={{ color: "white", textAlign: "center" }}>
              <Link href="/facebook">Facebook page</Link>
            </Typography>
          </Grid>
          <Grid item xs={12} sm="auto">
            <Typography
              variant="h5"
              style={{ color: "white", textAlign: "center" }}>
              <Link href="/instagram">Instagram page</Link>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </header>
  );
}
export default Header;
