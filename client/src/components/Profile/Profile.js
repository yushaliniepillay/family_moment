import React, { useState, useEffect } from 'react';
import { Container, Grid, CardMedia } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { useSelector, useDispatch } from 'react-redux';

import { getPost } from '../../actions/posts';
import Form from './Form/Form';
import useStyles from './styles';

const Profile = ({post}) => {
  const classes = useStyles();
  const tileData = useSelector((state) => state.posts);
  const [currentId, setCurrentId] = useState(0);

  const [name, setName] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [currentId, dispatch]);

  return (
    <Container>
      <h1>Title</h1>
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={7}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map((tile) => (
              <GridListTile key={tile.selectedFile} cols={tile.cols || 1}>
                
                <CardMedia image={tile.selectedFile} />
                {/* <img alt={tile.selectedFile} /> */}
              </GridListTile>
            ))}
          </GridList>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
        </Grid>
      </Grid>
    </Container>


  );
};

export default Profile;
