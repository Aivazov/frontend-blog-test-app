import Container from '@mui/material/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Header } from './components';
import { Home, FullPost, Registration, AddPost, Login } from './pages';
import { fetchUser, selectIsAuth } from './redux/slices/authSlice';

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth); //check if we already authorized

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
