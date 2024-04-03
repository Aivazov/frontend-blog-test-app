import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import styles from "./Login.module.scss";

export const Login = () => {
  const {register, handleSubmit, setError, formState :{errors, isValid},} = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = (values )=> {
    console.log('values Login.jsx',values);
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error
          helperText={errors}
          fullWidth
          {...register('email', {required: 'Indicate email'})}
        />
        <TextField className={styles.field} label="Пароль" fullWidth 
          {...register('password', {required: 'Indicate password'})}

        />
        <Button size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
