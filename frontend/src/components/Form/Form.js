import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import { TextField, Paper, Typography, Button } from '@material-ui/core';

import { createPost, updatepost } from '../../actions/PostActions';

import useStyles from './FormStyles';

const Form = ({ currentId, setcurrentId }) => {
  const [creator, setcreator] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [tags, setTags] = useState('');
  const [selectedFile, setselectedFile] = useState('');

  const { posts } = useSelector((state) => state.postList);

  const updatingPost = posts ? posts.find((p) => p._id === currentId) : null;

  const dispatch = useDispatch();

  const classes = useStyles();

  useEffect(() => {
    if (updatingPost) {
      setcreator(updatingPost.creator);
      setTitle(updatingPost.title);
      setMessage(updatingPost.message);
      setTags(updatingPost.tags);
      setselectedFile(updatingPost.selectedFile);
    }
  }, [updatingPost]);

  const submitHandler = (e) => {
    e.preventDefault();
    const postData = { creator, title, message, tags, selectedFile };

    if (currentId) {
      dispatch(updatepost(currentId, postData));
    } else {
      dispatch(createPost(postData));
    }

    clearForm();
  };

  const clearForm = () => {
    setcurrentId(null);
    setcreator('');
    setTitle('');
    setMessage('');
    setTags('');
    setselectedFile('');
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        onSubmit={submitHandler}
      >
        <Typography variant="h6">
          {currentId ? `Editing a Memory` : `Creating a Memory`}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={creator}
          onChange={(e) => setcreator(e.target.value)}
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <TextField
          name="tags"
          variant="outlined"
          label="tags"
          fullWidth
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setselectedFile(base64)}
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          type="submit"
          size="large"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          type="submit"
          size="small"
          fullWidth
          onClick={clearForm}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
