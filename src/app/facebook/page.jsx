'use client';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
function FacebookPage() {

 

  const router =  useRouter();

  const handleBtn = () => {
    alert('Back Home');
    router.push('/');
  }

  return (
    <Box>
        <Stack  spacing={6} p={5} justifyContent={'center'} alignItems={'center'} >
            <Box>
                <Typography variant="h5" >
                    Facebook page
                </Typography>
                  <Button onClick={handleBtn} variant="contained" color="primary">
                    Back Home
                  </Button>
              </Box>  
          </Stack>  


    </Box>
  );
}
export default FacebookPage;