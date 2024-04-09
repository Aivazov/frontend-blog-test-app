import React, { useState, useCallback, useRef, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import axios from '../../axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../../redux/slices/authSlice';

export const AddPost = () => {
  const isAuth = useSelector(selectIsAuth);
  const navigate = useNavigate();

  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');

  const [imageUrl, setImageUrl] = useState('');
  const inputFileRef = useRef(null);

  const handleChangeFile = async (e) => {
    console.log(e.target.files);

    try {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/uploads', formData);
      console.log('data AddPost', data);
      setImageUrl(data.url);
    } catch (error) {
      console.warn(error);
      alert('Failed to upload the file');
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null);
  };

  const onChange = useCallback((text) => {
    setText(text);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Text here...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  const onSubmit = async () => {
    try {
      setLoading(true);

      const fields = {
        title,
        imageUrl,
        tags,
        // tags: tags.split(','),
        text,
      };

      const { data } = await axios.post('/posts', fields);

      const postId = data._id;
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.warn(error);
      alert('Failed to create post');
    }
  };

  if (!window.localStorage.getItem('token') && !isAuth) {
    return <Navigate to="/" />;
  }

  console.log({ title, tags, text });
  return (
    <Paper style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()} //allows to refer to another DOM element by clicking here
        variant="outlined"
        size="large"
      >
        Upload an image
      </Button>
      <input
        type="file"
        ref={inputFileRef}
        onChange={handleChangeFile}
        hidden
      />
      {imageUrl && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Remove
          </Button>
          <img
            className={styles.image}
            src={`http://localhost:2999${imageUrl}`}
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Article title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags"
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          Pulicate
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
