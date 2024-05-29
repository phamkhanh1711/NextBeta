"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

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
      style={{ height: "100vh" }}
    >
      {loading ? (
        <>
          <Image
            src="/vercel.svg"
            alt="Vercel Logo"
            width={72}
            height={16}
            className={styles.logo}
          />
          <Typography variant="h6" component="div" gutterBottom>
            Welcome to Next.js!
          </Typography>
        </>
      ) : (
        <Typography variant="h6" component="div" gutterBottom>
          Content loaded.
        </Typography>
      )}
    </Grid>
  );
}

export default Home;
