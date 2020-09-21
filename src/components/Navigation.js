import SearchBar from './SearchBar';
import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import favicon from '../../public/favicon.ico';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/PublishOutlined';
import PersonOutlinedIcon from '@material-ui/icons/PersonOutlined';
import VideoLibraryIcon from '@material-ui/icons/VideoLibraryOutlined';

import { Link } from 'react-router-dom';
import { Box } from '@material-ui/core';
import { UserContext } from '../contexts/UserContext';

export default function Navigation() {
  const { user } = useContext(UserContext);

  const styles = {
    menu: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#23272a',
      justifyContent: 'space-between',
    },
    logo: {
      width: '50px',
      height: 'auto',
      display: 'flex',
      objectFit: 'cover',
      alignItems: 'center',
      justifyContent: 'center',
    },
  };

  return (
    <Grid style={styles.menu} container>
      <Grid item>
        <Link to='/'>
          <img src={favicon} style={{ ...styles.logo, cursor: 'pointer' }} />
        </Link>
      </Grid>
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item>
        <Grid container>
          <Box>
            {user && (
              <IconButton component={Link} to='/upload' color='primary'>
                <UploadIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            {user && user.id && (
              <IconButton component={Link} to={`/u/${user.username}`} color='primary'>
                <VideoLibraryIcon />
              </IconButton>
            )}
          </Box>
          <Box>
            {user ? (
              <IconButton to='/account' component={Link} color='primary'>
                <PersonOutlinedIcon />
              </IconButton>
            ) : (
                <IconButton to='/login' component={Link} color='primary'>
                  <PersonOutlinedIcon />
                </IconButton>
              )}
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
