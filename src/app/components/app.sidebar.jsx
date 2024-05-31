"use client";

import { Box, Stack } from "@mui/material";
import Link from "next/link";

function Sidebar() {
  return (
    <Box  >
      <Stack style={{marginTop:"10%"}} p={10} direction="column" spacing={2}>
        <Box>
            <Link href="/Foods" >Food Product</Link>
        </Box>
        <Box> <Link href="/Foods" >Food Detail</Link></Box>
      </Stack>
    </Box>
  );
}
export default Sidebar;
