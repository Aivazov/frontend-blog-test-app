import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import { fetchAuth, selectIsAuth } from '../../redux/slices/authSlice';

export const Login = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: 'aivazov3@test.com',
      passwordHash: 'qwerty123',
    },
    mode: 'onChange',
  });

  const onSubmit = (values) => {
    console.log('values Login.jsx', values);
    dispatch(fetchAuth(values));
  };

  console.log(errors, isValid);
  console.log('isAuth', isAuth);

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Account Sign In
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          fullWidth
          {...register('email', { required: 'Enter an email' })}
        />
        <TextField
          className={styles.field}
          label="Password"
          fullWidth
          error={Boolean(errors.passwordHash?.message)}
          helperText={errors.passwordHash?.message}
          {...register('passwordHash', { required: 'Enter a password' })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
