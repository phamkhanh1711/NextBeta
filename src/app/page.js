"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Grid, MenuItem, MenuList, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "100vh" }}>
      <MenuList>
        <MenuItem>
          <Typography variant="h4">
            <Link href="/facebook">Facebook page</Link>
          </Typography>
        </MenuItem>
        <MenuItem>
        <Typography variant="h4">
            <Link href="/instagram">Instagram page</Link>
          </Typography>
        </MenuItem>
      </MenuList>
    </Grid>
  );
}

export default Home;
