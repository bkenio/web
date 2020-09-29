import React, { useContext, } from 'react';
import moment from 'moment';
import styled from 'styled-components';

import Menu from '@material-ui/core/Menu';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

import { Link, } from 'react-router-dom';
import videoDuration from '../utils/videoDuration';
import { UserContext, } from '../contexts/UserContext';

const Duration = styled.div`
  right: 0;
  bottom: 0;
  z-index: 0;
  color: white;
  font-size: 12px;
  font-weight: 600;
  position: absolute;
  border-radius: 3px;
  margin: 0px 3px 3px 0px;
  padding: 0px 3px 0px 3px;
  background: rgba(0, 0, 0, 0.7);
`;

function VideoCard({ video }) {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card elevation={4}>
      <Link to={`/v/${video.id}`}>
        <CardActionArea>
          <div
            style={{
              width: '100%',
              cursor: 'pointer',
              minHeight: '180px',
              maxHeight: '180px',
              position: 'relative',
              backgroundColor: 'grey',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url("${video.thumbnails ? video.thumbnails[0] : ''}")`,
              backgroundPosition: 'center',
            }}
          >
            <Duration>{videoDuration(video.duration)}</Duration>
          </div>
          <CardContent>
            <Typography gutterBottom variant='h4' noWrap>
              {video.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardHeader
        avatar={<Avatar aria-label='avatar' src={video.user.avatar} />}
        action={(
          <div>
            <IconButton onClick={handleClick} aria-label='settings'>
              <MoreVertIcon />
            </IconButton>
            <Menu
              id='simple-menu'
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user && user.id === video.user.id && (
                <MenuItem onClick={handleClose} component={Link} to={`/editor/${video.id}`}>
                  Edit
                </MenuItem>
              )}
            </Menu>
          </div>
        )}
        title={<Link to={`/u/${video.user.username}`}>{video.user.username}</Link>}
        subheader={moment(parseInt(video.createdAt)).fromNow()}
      />
    </Card>
  );
}

export default function VideoGrid({ videos = [] }) {
  return (
    <Grid
      container
      spacing={2}
      direction='row'
      style={{
        width: '100%',
        margin: '0px',
        padding: '15px',
      }}
      justify='flex-start'
      alignItems='flex-start'
    >
      {videos.map((video) => (
        <Grid xs={12} sm={12} md={6} lg={4} xl={3} item key={video.id}>
          <VideoCard video={video} />
        </Grid>
      ))}
    </Grid>
  );
}