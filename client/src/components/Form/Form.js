import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase64 from 'react-file-base64';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const types = ['image/png', 'image/jpeg'];

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: '', message: '', tags: '', selectedFile: '' });
  };

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file (png or jpeg)');
    }

  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
            </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          required
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          required
          name="message"
          variant="outlined"
          label="Message"
          fullWidth multiline rows={4}
          value={postData.message}
          onChange={(e) => setPostData({ ...postData, message: e.target.value })}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags (coma separated)"
          fullWidth value={postData.tags}
          onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
        />
        <div className={classes.fileInput}>
          <FileBase64
          required
            type="file"
            multiple={false}
            accept=".jpeg, .png, .jpg"
            onChange={changeHandler}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 }) }
          />
          {/* <input
            type="file"
            multiple={false}
            onChange={changeHandler}
            onClick={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          /> */}
          <div>
            <p>
              {error}
            </p>
          </div>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth>
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth>
          Clear
                    </Button>
      </form>
    </Paper>
  );
}

export default Form;