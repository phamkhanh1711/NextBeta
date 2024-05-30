'use client';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';

function FacebookPage() {
  const [getdata, setdata] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    console.log('useEffect is running'); // Check if useEffect is running

    // Temporarily use a known working API for testing
    // axios.get('https://jsonplaceholder.typicode.com/posts')
    axios.get('http://localhost:4000/movie/all-upcoming-movie')
      .then((response) => {
        console.log('API Response:', response); // Check API response here
        setdata(response.data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError(error); // Set error state
        setLoading(false); // Set loading to false if there's an error
      });
  }, []); // Note the empty dependency array to run once on mount

  const router = useRouter();

  const handleBtn = () => {
    alert('Back Home');
    router.push('/');
  };

  return (
    <Box>
      <Stack spacing={6} p={5} justifyContent={'center'} alignItems={'center'}>
        <Box>
          <Typography variant="h5">
            Facebook page
          </Typography>
          <Button onClick={handleBtn} variant="contained" color="primary">
            Back Home
          </Button>
        </Box>
        <Box>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography>Error: {error.message}</Typography>
          ) : (
            getdata.map((movie, index) => (
              <Box key={index} mb={2}>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography>{movie.description}</Typography>
              </Box>
            ))
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default FacebookPage;
