"use client"
import { Box, Stack, Typography } from "@mui/material";
function Footer()
{
    return(
        
        <footer>
          <Box sx={{ paddingY: 2, backgroundColor: "grey.400" }}>
            <Stack
              direction="row"
              spacing={6}
              justifyContent="center"
              alignItems="center">
              <Typography variant="h5">Footer</Typography>
            </Stack>
          </Box>
        </footer>
    )
}   
export default Footer;
