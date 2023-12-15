import React from 'react';
import { Container, Typography, Paper, Box, useTheme, useMediaQuery } from '@mui/material';
import styles from './UserProfile.module.css'

interface User {
  username?: string;
  email?: string;
}

const User: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const user: User = JSON.parse(sessionStorage.getItem('user') || '{}');
  const { username, email } = user;

  if (!username || !email) {
    return (
      <Container component="main" maxWidth="xs">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
          <Typography variant="h5" align="center">
            No user data available. Please log in.
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container component="main">
      <Box className={styles.paperBag} display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Paper  elevation={4} sx={{ padding: isMobile ? '20px' : '60px', width: isMobile ? '100%' : 'auto' , backgroundColor:'#EEE0C9'}}>
          <Typography component="h1" variant="h5" align="center">
            {username} Profile
          </Typography>
          <Typography variant="body1" sx={{ marginTop: '20px' }}>
            <strong>Username:</strong> {username}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {email}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default User;
